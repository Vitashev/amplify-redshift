// import {
//   RedshiftDataClient,
//   ExecuteStatementCommand,
// } from "@aws-sdk/client-redshift-data";
// const {
//   RedshiftDataClient,
//   //RedshiftData,
//   ExecuteStatementCommand,
//   GetStatementResultCommand,
// } = require("@aws-sdk/client-redshift-data");
const AWS = require("aws-sdk");

//const redshiftData = new RedshiftDataClient({ region: 'us-west-2' });

const providersMap = new Map([
  [
    "0",
    {
      id: "0",
      cms_certification_number_ccn: 23,
      provider_name: "Name 1",
      provider_address: "laborisirureamet",
      citytown: "pariaturinidexerc",
      state: "euadipisicingadveniammag",
      zip_code: 18,
      telephone_number: 16,
      createdAt: "2023-09-13T03:43:08.124Z",
      updatedAt: "2023-09-13T03:43:08.124Z",
    },
  ],
  [
    "1",
    {
      id: "1",
      cms_certification_number_ccn: 24,
      provider_name: "Name 2",
      provider_address: "doloradaliquacillumin",
      citytown: "commodolaboreeusinttemporn",
      state: "irureexesseexcepteurculp",
      zip_code: 29,
      telephone_number: 17,
      createdAt: "2023-09-13T03:43:08.156Z",
      updatedAt: "2023-09-13T03:43:08.156Z",
    },
  ],
  [
    "2",
    {
      id: "2",
      cms_certification_number_ccn: 26,
      provider_name: "Name 3",
      provider_address: "occaecateuestoff",
      citytown: "consequatametdoreprehenderitla",
      state: "Loremaliquacommodonulla",
      zip_code: 19,
      telephone_number: 25,
      createdAt: "2023-09-13T03:43:08.194Z",
      updatedAt: "2023-09-13T03:43:08.194Z",
    },
  ],
]);

function getProviders() {
  //   return PROVIDERS;
  return Array.from(providersMap.values());
}

function getProviderById(providerId) {
  //   return PROVIDERS.filter((provider) => provider.id === providerId);
  return providersMap.get(providerId);
}

/**
 * Using this as the entry point, you can use a single function to handle many resolvers.
 */
const resolvers = {
  Query: {
    listProviders: (ctx) => {
      return getProviders().filter((provider) => {
        if (ctx.arguments.input) {
          const isFiltered = Object.entries(ctx.arguments.input).some(
            ([key, value]) => {
              return provider[key].indexOf(value) === -1;
            }
          );

          return !isFiltered;
        }

        return true;
      });
    },
    getProvider: (ctx) => {
      return getProviderById(ctx.arguments.id);
    },
  },
  Mutation: {
    createProvider: (ctx) => {
      //   const newProvider = ctx.arguments.input;
      providersMap.set(ctx.arguments.input.id, ctx.arguments.input);
      //   return newProvider;
      return getProviders();
    },
    updateProvider: (ctx) => {
      providersMap.set(ctx.arguments.input.id, {
        ...providersMap.get(ctx.arguments.input.id),
        ...ctx.arguments.input,
      });
      // const updatedProvider = providersMap.get(ctx.arguments.input.id);
      // return updatedProvider;
      return getProviders();
    },
    deleteProvider: (ctx) => {
      //const deletedProvider = { ...providersMap.get(ctx.arguments.id) };
      providersMap.delete(ctx.arguments.id);
      //return deletedProvider;
      return getProviders();
    },
  },
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const params = {
    WorkgroupName: "default-workgroup",
    Database: "dev",
    //DbUser: 'your-db-username',
    Sql: "SELECT * FROM public.provider_test",
  };

  // Initiate RedshiftData client
  const redshiftDataApiClient = new AWS.RedshiftData({ region: "us-west-2" });

  const res = await executeSqlDataApi(
    redshiftDataApiClient,
    "default-workgroup",
    "dev",
    "",
    "SELECT * FROM public.provider_test",
    false
  );

  console.log(res);

  // try {
  //   const queryId = await redshiftData.executeStatement(params).promise();

  //   const queryParams = {
  //   WorkgroupName: "default-workgroup",
  //     Database: 'dev',
  //   // DbUser: 'admin',
  //     QueryId: queryId.Id,
  //   };

  //   const { Records } = await redshiftData.getStatementResult(queryParams).promise();

  //   // Process the retrieved records
  //   console.log(Records);

  //   // Return the processed records or perform any other required actions
  // // return Records;
  // } catch (error) {
  //   console.error('Error occurred:', error);
  // // throw error;
  // }

  /* const client = new RedshiftDataClient({ region: "us-west-2" });
  const params = {
    WorkgroupName: "default-workgroup",
    //WorkgroupName: "arn:aws:redshift-serverless:us-west-2:020386288641:workgroup/4baf8388-13c7-4f8f-a8d1-3d20467b8d2b",
   
    Database: "dev",
   
    Sql: "select * from devpublic.provider_test limit 100",
  };
 
  try {
    const executeResponse = await client.send(new ExecuteStatementCommand(params));
    const queryId = executeResponse.Id;
     console.log({queryId});
   
    const resultResponse = await client.send(new GetStatementResultCommand({ Id: queryId }));
    const resultData = resultResponse.Records;
   
    console.log(resultData);
  } catch (err) {
    console.log("Error", err);
  }*/

  // try {
  //   const data = await client.send(new ExecuteStatementCommand(params));
  //   console.log(data);
  // } catch (err) {
  //   console.log("Error", err);
  // }

  const typeHandler = resolvers[event.typeName];
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName];
    if (resolver) {
      return await resolver(event);
    }
  }
  throw new Error("Resolver not found.");
};

const executeSqlDataApi = async (
  redshiftDataApiClient,
  redshiftWorkgroupName,
  redshiftDatabaseName,
  command,
  query,
  isSynchronous
) => {
  let queryId = "";

  const executeStatementInput = {
    WorkgroupName: redshiftWorkgroupName,
    Database: redshiftDatabaseName,
    Sql: query,
  };

  // Calling Redshift Data API with executeStatement()
  await redshiftDataApiClient
    .executeStatement(executeStatementInput)
    .promise()
    .then((response) => {
      queryId = response.Id;
    })
    .catch((error) => {
      console.log("ExecuteStatement has failed.");
      throw new Error(error);
    });

  let { Status: queryStatus } = await getDescribeStatement(
    redshiftDataApiClient,
    queryId
  );

  console.log(
    `Executed command: ${command} | Query Status: ${queryStatus} | QueryId: ${queryId}`
  );

  if (isSynchronous) {
    queryStatus = await executeSynchronousWait(
      redshiftDataApiClient,
      queryStatus,
      queryId,
      command
    );
  }

  return queryStatus;
};

const executeSynchronousWait = async (
  redshiftDataApiClient,
  queryStatus,
  queryId,
  command
) => {
  let attempts = 0;
  const MAX_WAIT_CYCLES = 20;
  let describeStatementInfo = {};

  // Wait until query is finished or max cycles limit has been reached.
  while (attempts < MAX_WAIT_CYCLES) {
    attempts++;
    await sleep(1);

    ({ Status: queryStatus, ...describeStatementInfo } =
      await getDescribeStatement(redshiftDataApiClient, queryId));

    if (queryStatus === "FAILED") {
      throw new Error(
        `SQL query failed: ${queryId}: \n Error: ${describeStatementInfo.Error}`
      );
    } else if (queryStatus === "FINISHED") {
      console.log(
        `Query status is: ${queryStatus} for query id: ${queryId} and command: ${command}`
      );

      // Print query response if available (typically from Select SQL statements)
      if (describeStatementInfo.HasResultSet) {
        await redshiftDataApiClient
          .getStatementResult({ Id: queryId })
          .promise()
          .then((statementResult) => {
            console.log(
              `Printing response for query: ${command} --> ${JSON.stringify(
                statementResult.Records
              )}`
            );
          })
          .catch((error) => {
            console.log("GetStatementResult has failed.");
            throw new Error(error);
          });
      }

      break;
    } else {
      console.log(`Currently working... query status is ${queryStatus}`);
    }

    if (attempts >= MAX_WAIT_CYCLES) {
      throw new Error(
        `Limit for MAX_WAIT_CYCLES has been reached before the query was able to finish. We have exited out of the while-loop. You may increase the limit accordingly. \n Query status is: %s for query id: ${queryId} and command: ${command}`
      );
    }
  }
  return queryStatus;
};

const getDescribeStatement = async (redshiftDataApiClient, queryId) =>
  redshiftDataApiClient
    .describeStatement({ Id: queryId })
    .promise()
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("DescribeStatement has failed.");
      throw new Error(error);
    });

const populateSqlStatementSet = async (redshiftIAMRole) => {
  const sqlStatements = new Map();
  sqlStatements.set(
    "CREATE",
    "CREATE TABLE IF NOT EXISTS public.region (\n" +
      "  R_REGIONKEY bigint NOT NULL,\n" +
      "  R_NAME varchar(25),\n" +
      "  R_COMMENT varchar(152))\n" +
      "diststyle all;"
  );

  sqlStatements.set(
    "COPY",
    "COPY region FROM 's3://redshift-immersionday-labs/data/region/region.tbl.lzo'\n" +
      "iam_role '" +
      redshiftIAMRole +
      "' \n" +
      "region 'us-west-2' lzop delimiter '|' COMPUPDATE PRESET;"
  );

  sqlStatements.set(
    "UPDATE",
    "UPDATE public.region SET r_regionkey= 5 WHERE r_name ='AFRICA';"
  );

  sqlStatements.set(
    "DELETE",
    "DELETE FROM public.region where r_name = 'MIDDLE EAST';"
  );

  sqlStatements.set("SELECT", "SELECT r_regionkey, r_name FROM public.region;");
  return sqlStatements;
};

const sleep = (seconds) => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};
