/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CreateProviderInputValues = {
    id?: string;
    cms_certification_number_ccn?: string;
    provider_name?: string;
    provider_address?: string;
    citytown?: string;
    state?: string;
    zip_code?: string;
    telephone_number?: string;
};
export declare type CreateProviderValidationValues = {
    id?: ValidationFunction<string>;
    cms_certification_number_ccn?: ValidationFunction<string>;
    provider_name?: ValidationFunction<string>;
    provider_address?: ValidationFunction<string>;
    citytown?: ValidationFunction<string>;
    state?: ValidationFunction<string>;
    zip_code?: ValidationFunction<string>;
    telephone_number?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CreateProviderOverridesProps = {
    CreateProviderGrid?: PrimitiveOverrideProps<GridProps>;
    id?: PrimitiveOverrideProps<TextFieldProps>;
    cms_certification_number_ccn?: PrimitiveOverrideProps<TextFieldProps>;
    provider_name?: PrimitiveOverrideProps<TextFieldProps>;
    provider_address?: PrimitiveOverrideProps<TextFieldProps>;
    citytown?: PrimitiveOverrideProps<TextFieldProps>;
    state?: PrimitiveOverrideProps<TextFieldProps>;
    zip_code?: PrimitiveOverrideProps<TextFieldProps>;
    telephone_number?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CreateProviderProps = React.PropsWithChildren<{
    overrides?: CreateProviderOverridesProps | undefined | null;
} & {
    onSubmit: (fields: CreateProviderInputValues) => void;
    onChange?: (fields: CreateProviderInputValues) => CreateProviderInputValues;
    onValidate?: CreateProviderValidationValues;
} & React.CSSProperties>;
export default function CreateProvider(props: CreateProviderProps): React.ReactElement;
