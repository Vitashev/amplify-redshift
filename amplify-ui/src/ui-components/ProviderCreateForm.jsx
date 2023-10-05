/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Provider } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ProviderCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    cms_certification_number_ccn: "",
    provider_name: "",
    provider_address: "",
    citytown: "",
    state: "",
    zip_code: "",
    telephone_number: "",
  };
  const [cms_certification_number_ccn, setCms_certification_number_ccn] =
    React.useState(initialValues.cms_certification_number_ccn);
  const [provider_name, setProvider_name] = React.useState(
    initialValues.provider_name
  );
  const [provider_address, setProvider_address] = React.useState(
    initialValues.provider_address
  );
  const [citytown, setCitytown] = React.useState(initialValues.citytown);
  const [state, setState] = React.useState(initialValues.state);
  const [zip_code, setZip_code] = React.useState(initialValues.zip_code);
  const [telephone_number, setTelephone_number] = React.useState(
    initialValues.telephone_number
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setCms_certification_number_ccn(initialValues.cms_certification_number_ccn);
    setProvider_name(initialValues.provider_name);
    setProvider_address(initialValues.provider_address);
    setCitytown(initialValues.citytown);
    setState(initialValues.state);
    setZip_code(initialValues.zip_code);
    setTelephone_number(initialValues.telephone_number);
    setErrors({});
  };
  const validations = {
    cms_certification_number_ccn: [{ type: "Required" }],
    provider_name: [],
    provider_address: [],
    citytown: [],
    state: [],
    zip_code: [],
    telephone_number: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          cms_certification_number_ccn,
          provider_name,
          provider_address,
          citytown,
          state,
          zip_code,
          telephone_number,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(new Provider(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ProviderCreateForm")}
      {...rest}
    >
      <TextField
        label="Cms certification number ccn"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={cms_certification_number_ccn}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              cms_certification_number_ccn: value,
              provider_name,
              provider_address,
              citytown,
              state,
              zip_code,
              telephone_number,
            };
            const result = onChange(modelFields);
            value = result?.cms_certification_number_ccn ?? value;
          }
          if (errors.cms_certification_number_ccn?.hasError) {
            runValidationTasks("cms_certification_number_ccn", value);
          }
          setCms_certification_number_ccn(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "cms_certification_number_ccn",
            cms_certification_number_ccn
          )
        }
        errorMessage={errors.cms_certification_number_ccn?.errorMessage}
        hasError={errors.cms_certification_number_ccn?.hasError}
        {...getOverrideProps(overrides, "cms_certification_number_ccn")}
      ></TextField>
      <TextField
        label="Provider name"
        isRequired={false}
        isReadOnly={false}
        value={provider_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cms_certification_number_ccn,
              provider_name: value,
              provider_address,
              citytown,
              state,
              zip_code,
              telephone_number,
            };
            const result = onChange(modelFields);
            value = result?.provider_name ?? value;
          }
          if (errors.provider_name?.hasError) {
            runValidationTasks("provider_name", value);
          }
          setProvider_name(value);
        }}
        onBlur={() => runValidationTasks("provider_name", provider_name)}
        errorMessage={errors.provider_name?.errorMessage}
        hasError={errors.provider_name?.hasError}
        {...getOverrideProps(overrides, "provider_name")}
      ></TextField>
      <TextField
        label="Provider address"
        isRequired={false}
        isReadOnly={false}
        value={provider_address}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cms_certification_number_ccn,
              provider_name,
              provider_address: value,
              citytown,
              state,
              zip_code,
              telephone_number,
            };
            const result = onChange(modelFields);
            value = result?.provider_address ?? value;
          }
          if (errors.provider_address?.hasError) {
            runValidationTasks("provider_address", value);
          }
          setProvider_address(value);
        }}
        onBlur={() => runValidationTasks("provider_address", provider_address)}
        errorMessage={errors.provider_address?.errorMessage}
        hasError={errors.provider_address?.hasError}
        {...getOverrideProps(overrides, "provider_address")}
      ></TextField>
      <TextField
        label="Citytown"
        isRequired={false}
        isReadOnly={false}
        value={citytown}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cms_certification_number_ccn,
              provider_name,
              provider_address,
              citytown: value,
              state,
              zip_code,
              telephone_number,
            };
            const result = onChange(modelFields);
            value = result?.citytown ?? value;
          }
          if (errors.citytown?.hasError) {
            runValidationTasks("citytown", value);
          }
          setCitytown(value);
        }}
        onBlur={() => runValidationTasks("citytown", citytown)}
        errorMessage={errors.citytown?.errorMessage}
        hasError={errors.citytown?.hasError}
        {...getOverrideProps(overrides, "citytown")}
      ></TextField>
      <TextField
        label="State"
        isRequired={false}
        isReadOnly={false}
        value={state}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cms_certification_number_ccn,
              provider_name,
              provider_address,
              citytown,
              state: value,
              zip_code,
              telephone_number,
            };
            const result = onChange(modelFields);
            value = result?.state ?? value;
          }
          if (errors.state?.hasError) {
            runValidationTasks("state", value);
          }
          setState(value);
        }}
        onBlur={() => runValidationTasks("state", state)}
        errorMessage={errors.state?.errorMessage}
        hasError={errors.state?.hasError}
        {...getOverrideProps(overrides, "state")}
      ></TextField>
      <TextField
        label="Zip code"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={zip_code}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              cms_certification_number_ccn,
              provider_name,
              provider_address,
              citytown,
              state,
              zip_code: value,
              telephone_number,
            };
            const result = onChange(modelFields);
            value = result?.zip_code ?? value;
          }
          if (errors.zip_code?.hasError) {
            runValidationTasks("zip_code", value);
          }
          setZip_code(value);
        }}
        onBlur={() => runValidationTasks("zip_code", zip_code)}
        errorMessage={errors.zip_code?.errorMessage}
        hasError={errors.zip_code?.hasError}
        {...getOverrideProps(overrides, "zip_code")}
      ></TextField>
      <TextField
        label="Telephone number"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={telephone_number}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              cms_certification_number_ccn,
              provider_name,
              provider_address,
              citytown,
              state,
              zip_code,
              telephone_number: value,
            };
            const result = onChange(modelFields);
            value = result?.telephone_number ?? value;
          }
          if (errors.telephone_number?.hasError) {
            runValidationTasks("telephone_number", value);
          }
          setTelephone_number(value);
        }}
        onBlur={() => runValidationTasks("telephone_number", telephone_number)}
        errorMessage={errors.telephone_number?.errorMessage}
        hasError={errors.telephone_number?.hasError}
        {...getOverrideProps(overrides, "telephone_number")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
