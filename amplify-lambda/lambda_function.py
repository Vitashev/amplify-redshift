import os
import ast
import json
import boto3
import time
import botocore
import botocore.session as bc
from botocore.client import Config

def parse_response(response):
    # Extracting column metadata and records
    column_metadata = response['ColumnMetadata']
    records = response['Records']

    # Creating a list to store the transformed data
    transformed_data = []

    # Iterating through records to create key-value pairs
    for record_list in records:
        record_dict = {}
        for col_meta, col_value in zip(column_metadata, record_list):
            col_name = col_meta['name']
            col_value = col_value.get('stringValue', col_value.get('longValue'))
            record_dict[col_name] = col_value
        transformed_data.append(record_dict)

    return transformed_data
    
def generate_query(input_fields):
    # Valid fields for filtering (assuming 'telephone_number' and 'zip_code' are integers)
    valid_fields = ['cms_certification_number_ccn', 'provider_name', 'provider_address', 'citytown', 'state', 'zip_code', 'telephone_number']

    # Filter input fields to only include valid fields
    filtered_fields = {key: value for key, value in input_fields.items() if key in valid_fields}

    # Generate the WHERE clause for each field using LIKE for string fields
    where_clauses = [f"{field} LIKE '%{value}%'" if isinstance(value, str) else f"{field} = {value}" for field, value in filtered_fields.items()]

    # Combine WHERE clauses into a single string
    where_clause = " AND ".join(where_clauses)

    # Generate the full SQL query
    query_str = f"""
        SELECT * FROM dev.public.provider_Test
        {'WHERE ' + where_clause if where_clause else ''}
    """

    return query_str

# Define functions to get providers and provider by id
def get_providers(ctx = {}):
    # Return a list of values from the dictionary
    if bool(ctx) == False:
        query_str = "select * from dev.public.provider_Test;"
        return query_redshift(query_str)    

    arguments = ctx['arguments']
    
    if arguments:
        input = arguments['input']
        if input:
            # #
            # query_str = f"""
            #     SELECT * FROM dev.public.provider_Test WHERE provider_name LIKE '%{input['provider_name']}%'
            # """
            
            query_str = generate_query(input)
            print(query_str)
        else: 
            query_str = "select * from dev.public.provider_Test;"
    else:
        query_str = "select * from dev.public.provider_Test;"
        
    return query_redshift(query_str)    
    
def create_provider(arguments):
    print("create_provider")
 
    query_str = f"""
    INSERT INTO dev.public.provider_Test (
        id, cms_certification_number_ccn, provider_name, provider_address, citytown, state, zip_code, telephone_number
    ) VALUES (
        '{str(arguments['id'])}',
        '{str(arguments['cms_certification_number_ccn'])}',
        '{str(arguments['provider_name'])}',
        '{str(arguments['provider_address'])}',
        '{str(arguments['citytown'])}',
        '{str(arguments['state'])}',
        {int(arguments['zip_code'])},
        {int(arguments['telephone_number'])}
    );
    """
    query_redshift(query_str)
    return get_providers()

def get_provider_by_id(provider_id):
    # Return the value associated with the given key
    return providers_map.get(provider_id)
    
def delete_provider_by_id(provider_id):
    query_str = f"""
    delete from dev.public.provider_Test where id = {str(provider_id)}
    """
    query_redshift(query_str)
    return get_providers()
    
def update_provider_by_id(id, input):
    print("update_provider_by_id")
  
    query_str = f"""
    UPDATE dev.public.provider_Test SET 
        provider_name='{str(input['provider_name'])}',
        provider_address='{str(input['provider_address'])}', 
        cms_certification_number_ccn='{str(input['cms_certification_number_ccn'])}',
        citytown='{str(input['citytown'])}', 
        state='{str(input['state'])}',
        zip_code={int(input['zip_code'])}, 
        telephone_number={int(input['telephone_number'])} 
        WHERE id='{str(id)}'
    """
    query_redshift(query_str)
    return get_providers()
    
# Define a dictionary to store the resolvers
resolvers = {
    # Query resolvers
    'Query': {
        # List providers resolver
        'listProviders': lambda ctx: get_providers(ctx),
        # query_redshift(query_str)
        # Get provider resolver
        'getProvider': lambda ctx: get_provider_by_id(ctx['arguments']['id'])
    },
    
    # Mutation resolvers
    'Mutation': {
        # Create provider resolver
        'createProvider': lambda ctx: create_provider(ctx['arguments']['input']),
        # Update provider resolver
        'updateProvider': lambda ctx: update_provider_by_id(ctx['arguments']['input']['id'], ctx['arguments']['input']),
        # Delete provider resolver
        'deleteProvider': lambda ctx: delete_provider_by_id(ctx['arguments']['id'])
    }
}

client = boto3.client('redshift-data')
print('Loading function')

secret_name = os.environ['SecretId']  # getting SecretId from Environment varibales
print(secret_name)
session = boto3.session.Session()
region = session.region_name
print(region)

# Initializing Secret Manager's client
client = session.client(
    service_name='secretsmanager',
    region_name=region
)

get_secret_value_response = client.get_secret_value(
    SecretId=secret_name
)
secret_arn = get_secret_value_response['ARN']
print(secret_arn)

secret = get_secret_value_response['SecretString']
print(secret)

secret_json = json.loads(secret)

cluster_id = secret_json['dbClusterIdentifier']
print(cluster_id)

# Initializing Botocore client
bc_session = bc.get_session()

session = boto3.Session(
    botocore_session=bc_session,
    region_name=region
)

# Initializing Redshift's client
config = Config(connect_timeout=5, read_timeout=5)
print(config)

client_redshift = session.client("redshift-data", config=config)

def query_redshift(query_str):
    result = client_redshift.execute_statement(Database='dev', SecretArn=secret_arn, ClusterIdentifier=cluster_id, Sql=query_str)
    
    statement_id = result['Id']

    describe_statement = client_redshift.describe_statement(
        Id=statement_id
    )

    while True:
        describe_statement = client_redshift.describe_statement(Id=statement_id)
     
        if (describe_statement["Status"] == "FINISHED"):
            print("Query Status - " + describe_statement["Status"])
            break
        else:
            print("Query Status - " + describe_statement["Status"])
            time.sleep(1)
    try:
        # some code that may cause an error
        statement_result = client_redshift.get_statement_result(
            Id=statement_id
        )
        
        if statement_result:
            print(statement_result)
            # response_dict = ast.literal_eval(statement_result)
            # response_dict = json.loads(statement_result)
        
            result = parse_response(statement_result)
            print(result)
            return result
    except:
        # some code that handles the error
        print("error!")
        return None

def lambda_handler(event, context):
    print("Entered lambda_handler")
    print("API successfully executed")
    # return str(result)
        # Get the type handler from the resolvers dictionary
    type_handler = resolvers.get(event['typeName'])
    if type_handler:
        # Get the resolver function from the type handler dictionary
        resolver = type_handler.get(event['fieldName'])
        if resolver:
            # Return the result of calling the resolver function with the event argument
           res = resolver(event)
           return res
    
