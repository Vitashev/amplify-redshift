/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProvider = /* GraphQL */ `
  mutation CreateProvider($input: CreateProviderInput!) {
    createProvider(input: $input) {
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
export const updateProvider = /* GraphQL */ `
  mutation UpdateProvider($input: UpdateProviderInput!) {
    updateProvider(input: $input) {
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
export const deleteProvider = /* GraphQL */ `
  mutation DeleteProvider($id: ID!) {
    deleteProvider(id: $id) {
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
