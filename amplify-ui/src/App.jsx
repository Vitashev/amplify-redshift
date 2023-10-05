import { useEffect, useState } from "react";
// import "./App.css";
import { Authenticator, Flex } from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import { listProviders } from "./graphql/queries";
import Button from "@cloudscape-design/components/button";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Header from "@cloudscape-design/components/header";
import Modal from "@cloudscape-design/components/modal";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import Form from "@cloudscape-design/components/form";
import {
  createProvider,
  updateProvider,
  deleteProvider,
} from "./graphql/mutations";

const formLabels = {
  id: "Id",
  cms_certification_number_ccn: "Cms Certification Number (CCN)",
  provider_name: "Provider Name",
  provider_address: "Provider Address",
  citytown: "City/Town",
  state: "State",
  zip_code: "Zip Code",
  telephone_number: "Phone Number",
};

const providerKeys = [
  "id",
  "cms_certification_number_ccn",
  "provider_name",
  "provider_address",
  "citytown",
  "state",
  "zip_code",
  "telephone_number",
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [displayedProviders, setDisplayedProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState({});
  const [editedProvider, setEditedProvider] = useState({});
  const [queryProvidersFilter, setQueryProvidersFilter] = useState({
    id: "",
    cms_certification_number_ccn: "",
    provider_name: "",
    provider_address: "",
    citytown: "",
    state: "",
    zip_code: "",
    telephone_number: "",
  });
  const [createdProvider, setCreatedProvider] = useState({
    id: "",
    cms_certification_number_ccn: "",
    provider_name: "",
    provider_address: "",
    citytown: "",
    state: "",
    zip_code: "",
    telephone_number: "",
  });
  const [listProvidersFilter, setListProvidersFilter] = useState({});
  const [visible, setVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    API.graphql({
      query: listProviders,
      variables: {
        input: listProvidersFilter,
      },
    })
      .then(({ data: { listProviders } }) => {
        console.log({ listProviders });

        setDisplayedProviders(listProviders);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [listProvidersFilter]);

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          <Modal
            onDismiss={() => setIsCreateModalVisible(false)}
            visible={isCreateModalVisible}
            footer={
              <Box float="right">
                <SpaceBetween direction="horizontal" size="xs">
                  <Button
                    variant="link"
                    onClick={() => {
                      setIsCreateModalVisible(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      const newCreatedProvider = {
                        ...createdProvider,
                        // id: Number(createdProvider.id),
                        // cms_certification_number_ccn: Number(
                        //   createdProvider.cms_certification_number_ccn
                        // ),
                        zip_code: Number(createdProvider.zip_code),
                        telephone_number: Number(
                          createdProvider.telephone_number
                        ),
                      };

                      setIsLoading(true);
                      API.graphql({
                        query: createProvider,
                        variables: {
                          input: newCreatedProvider,
                        },
                      })
                        .then(({ data: { createProvider } }) => {
                          setDisplayedProviders(createProvider);
                        })
                        .catch((er) => {
                          console.log(er);
                        })
                        .finally(() => {
                          setIsLoading(false);
                        });
                      setIsCreateModalVisible(false);
                    }}
                  >
                    Submit
                  </Button>
                </SpaceBetween>
              </Box>
            }
            header="Create Provider"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log(e);
              }}
            >
              <Form>
                <SpaceBetween direction="vertical" size="l">
                  {providerKeys.map((providerKey) => (
                    <FormField
                      label={formLabels[providerKey]}
                      key={providerKey}
                    >
                      <Input
                        value={createdProvider[providerKey]}
                        onChange={(e) => {
                          createdProvider[providerKey] = e.detail.value;
                          setCreatedProvider({ ...createdProvider });
                        }}
                      />
                    </FormField>
                  ))}
                </SpaceBetween>
              </Form>
            </form>
          </Modal>
          <Modal
            onDismiss={() => setVisible(false)}
            visible={visible}
            footer={
              <Box float="right">
                <SpaceBetween direction="horizontal" size="xs">
                  <Button
                    variant="link"
                    onClick={() => {
                      setVisible(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      const updatedProvider = {
                        ...editedProvider,
                        cms_certification_number_ccn: Number(
                          editedProvider.cms_certification_number_ccn
                        ),
                        zip_code: Number(editedProvider.zip_code),
                        telephone_number: Number(
                          editedProvider.telephone_number
                        ),
                      };

                      const newEditedProvider = {
                        ...selectedProvider,
                        ...updatedProvider,
                      };
                      delete newEditedProvider["__typename"];
                      console.log(newEditedProvider);
                      setIsLoading(true);
                      API.graphql({
                        query: updateProvider,
                        variables: {
                          input: newEditedProvider,
                        },
                      })
                        .then(({ data: { updateProvider } }) => {
                          setDisplayedProviders(updateProvider);
                          setSelectedProvider({});
                          setEditedProvider({});
                          // setVisible(false);
                          setIsLoading(false);
                        })
                        .finally(() => {
                          setIsLoading(false);
                        });
                      setVisible(false);
                    }}
                  >
                    Submit
                  </Button>
                </SpaceBetween>
              </Box>
            }
            header="Update Provider"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log(e);
              }}
            >
              <Form>
                <SpaceBetween direction="vertical" size="l">
                  {providerKeys
                    .filter((providerKey) => providerKey !== "id")
                    .map((providerKey) => (
                      <FormField
                        label={formLabels[providerKey]}
                        key={providerKey}
                      >
                        <Input
                          value={editedProvider[providerKey]}
                          onChange={(e) => {
                            editedProvider[providerKey] = e.detail.value;
                            setEditedProvider({ ...editedProvider });
                          }}
                        />
                      </FormField>
                    ))}
                </SpaceBetween>
              </Form>
            </form>
          </Modal>
          <div
            style={{
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Header
              variant="h3"
              actions={<Button onClick={signOut}>Sign out</Button>}
            >
              Hello {user.username}
            </Header>
            <Form>
              <SpaceBetween direction="horizontal" size="l">
                {providerKeys
                  .filter((providerKey) => providerKey !== "id")
                  .map((providerKey) => (
                    <FormField
                      label={formLabels[providerKey]}
                      key={providerKey}
                    >
                      <Input
                        value={queryProvidersFilter[providerKey]}
                        onChange={(e) => {
                          queryProvidersFilter[providerKey] = e.detail.value;
                          setQueryProvidersFilter({ ...queryProvidersFilter });
                        }}
                      />
                    </FormField>
                  ))}
                <div style={{ marginTop: "25px" }}>
                  <Button
                    loading={isLoading}
                    variant="primary"
                    onClick={() => {
                      const localFilter = {};
                      Object.keys(queryProvidersFilter).forEach(
                        (listProvidersFilterKey) => {
                          if (
                            queryProvidersFilter[listProvidersFilterKey] !== ""
                          ) {
                            localFilter[listProvidersFilterKey] =
                              // listProvidersFilterKey ===
                              //   "cms_certification_number_ccn" ||
                              listProvidersFilterKey === "zip_code" ||
                              listProvidersFilterKey === "telephone_number"
                                ? Number(
                                    queryProvidersFilter[listProvidersFilterKey]
                                  )
                                : queryProvidersFilter[listProvidersFilterKey];
                          }
                        }
                      );

                      setListProvidersFilter({ ...localFilter });
                    }}
                  >
                    Query
                  </Button>
                </div>
              </SpaceBetween>
            </Form>

            <Table
              // loading={isLoading}
              columnDefinitions={[
                {
                  id: "id",
                  header: "id",
                  cell: (item) => <>{item.id}</>,
                },
                {
                  id: "cms_certification_number_ccn",
                  header: "Cms Certification Number (CCN)",
                  cell: (item) => <>{item.cms_certification_number_ccn}</>,
                },
                {
                  id: "provider_name",
                  header: "Provider Name",
                  cell: (item) => <>{item.provider_name}</>,
                },
                {
                  id: "provider_address",
                  header: "Provider Address",
                  cell: (item) => <>{item.provider_address}</>,
                },
                {
                  id: "citytown",
                  header: "City/Town",
                  cell: (item) => <>{item.citytown}</>,
                },
                {
                  id: "state",
                  header: "State",
                  cell: (item) => <>{item.state}</>,
                },
                {
                  id: "zip_code",
                  header: "Zip Code",
                  cell: (item) => <>{item.zip_code}</>,
                },
                {
                  id: "telephone_number",
                  header: "Phone Number",
                  cell: (item) => <>{item.telephone_number}</>,
                },

                {
                  id: "action",
                  header: "Actions",
                  minWidth: "220px",
                  cell: (item) => (
                    <Flex
                      // direction="row"
                      // justifyContent="flex-start"
                      // alignItems="stretch"
                      // alignContent="flex-start"
                      // wrap="nowrap"
                      gap="4px"
                    >
                      <Button
                        loading={isLoading}
                        variant="primary"
                        onClick={() => {
                          setSelectedProvider({ ...item });
                          setEditedProvider({ ...item });
                          setVisible(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        loading={isLoading}
                        onClick={() => {
                          setIsLoading(true);
                          API.graphql({
                            query: deleteProvider,
                            variables: {
                              id: item.id,
                            },
                          })
                            .then(({ data: { deleteProvider } }) => {
                              setDisplayedProviders(deleteProvider);
                            })
                            .finally(() => {
                              setIsLoading(false);
                            });
                        }}
                      >
                        Delete
                      </Button>
                    </Flex>
                  ),
                },
              ]}
              columnDisplay={[
                { id: "id", visible: false },
                { id: "cms_certification_number_ccn", visible: true },
                { id: "provider_name", visible: true },
                { id: "provider_address", visible: true },
                { id: "citytown", visible: true },
                { id: "state", visible: true },
                { id: "zip_code", visible: true },
                { id: "telephone_number", visible: true },
                { id: "action", visible: true },
              ]}
              // items={displayedProviders.filter((provider) => {
              //   if (JSON.stringify(listProvidersFilter) !== "{}") {
              //     const isFiltered = Object.entries(listProvidersFilter).some(
              //       ([key, value]) => {
              //         return provider[key].indexOf(value.toString()) === -1;
              //       }
              //     );

              //     return !isFiltered;
              //   }

              //   return true;
              // })}
              items={displayedProviders}
              loadingText="Loading resources"
              trackBy="id"
              empty={
                <Box
                  margin={{ vertical: "xs" }}
                  textAlign="center"
                  color="inherit"
                >
                  <SpaceBetween size="m">
                    <b>No resources</b>
                    <Button
                      loading={isLoading}
                      onClick={() => {
                        setIsCreateModalVisible(true);
                      }}
                    >
                      Create resource
                    </Button>
                  </SpaceBetween>
                </Box>
              }
              header={
                <Header
                  actions={
                    <SpaceBetween direction="horizontal" size="xs">
                      <Button
                        loading={isLoading}
                        variant="primary"
                        onClick={() => {
                          setIsCreateModalVisible(true);
                        }}
                      >
                        Create
                      </Button>
                    </SpaceBetween>
                  }
                >
                  Table with Providers
                </Header>
              }
            />
          </div>
        </>
      )}
    </Authenticator>
  );
}

export default App;
