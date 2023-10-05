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
export declare type ProviderCreateFormInputValues = {
    cms_certification_number_ccn?: number;
    provider_name?: string;
    provider_address?: string;
    citytown?: string;
    state?: string;
    zip_code?: number;
    telephone_number?: number;
};
export declare type ProviderCreateFormValidationValues = {
    cms_certification_number_ccn?: ValidationFunction<number>;
    provider_name?: ValidationFunction<string>;
    provider_address?: ValidationFunction<string>;
    citytown?: ValidationFunction<string>;
    state?: ValidationFunction<string>;
    zip_code?: ValidationFunction<number>;
    telephone_number?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProviderCreateFormOverridesProps = {
    ProviderCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    cms_certification_number_ccn?: PrimitiveOverrideProps<TextFieldProps>;
    provider_name?: PrimitiveOverrideProps<TextFieldProps>;
    provider_address?: PrimitiveOverrideProps<TextFieldProps>;
    citytown?: PrimitiveOverrideProps<TextFieldProps>;
    state?: PrimitiveOverrideProps<TextFieldProps>;
    zip_code?: PrimitiveOverrideProps<TextFieldProps>;
    telephone_number?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProviderCreateFormProps = React.PropsWithChildren<{
    overrides?: ProviderCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ProviderCreateFormInputValues) => ProviderCreateFormInputValues;
    onSuccess?: (fields: ProviderCreateFormInputValues) => void;
    onError?: (fields: ProviderCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProviderCreateFormInputValues) => ProviderCreateFormInputValues;
    onValidate?: ProviderCreateFormValidationValues;
} & React.CSSProperties>;
export default function ProviderCreateForm(props: ProviderCreateFormProps): React.ReactElement;
