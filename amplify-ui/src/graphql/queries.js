/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listProviders = /* GraphQL */ `
  query ListProviders($input: ListProvidersInput) {
    listProviders(input: $input) {
      id
      cms_certification_number_ccn
      provider_name
      provider_address
      citytown
      state
      zip_code
      telephone_number
      __typename
    }
  }
`;
export const getProvider = /* GraphQL */ `
  query GetProvider($id: ID!) {
    getProvider(id: $id) {
      id
      cms_certification_number_ccn
      provider_name
      provider_address
      citytown
      state
      zip_code
      telephone_number
      __typename
    }
  }
`;
