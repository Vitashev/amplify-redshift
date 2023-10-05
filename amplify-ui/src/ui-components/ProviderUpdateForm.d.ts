/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Provider } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ProviderUpdateFormInputValues = {
    cms_certification_number_ccn?: number;
    provider_name?: string;
    provider_address?: string;
    citytown?: string;
    state?: string;
    zip_code?: number;
    telephone_number?: number;
};
export declare type ProviderUpdateFormValidationValues = {
    cms_certification_number_ccn?: ValidationFunction<number>;
    provider_name?: ValidationFunction<string>;
    provider_address?: ValidationFunction<string>;
    citytown?: ValidationFunction<string>;
    state?: ValidationFunction<string>;
    zip_code?: ValidationFunction<number>;
    telephone_number?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProviderUpdateFormOverridesProps = {
    ProviderUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    cms_certification_number_ccn?: PrimitiveOverrideProps<TextFieldProps>;
    provider_name?: PrimitiveOverrideProps<TextFieldProps>;
    provider_address?: PrimitiveOverrideProps<TextFieldProps>;
    citytown?: PrimitiveOverrideProps<TextFieldProps>;
    state?: PrimitiveOverrideProps<TextFieldProps>;
    zip_code?: PrimitiveOverrideProps<TextFieldProps>;
    telephone_number?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProviderUpdateFormProps = React.PropsWithChildren<{
    overrides?: ProviderUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    provider?: Provider;
    onSubmit?: (fields: ProviderUpdateFormInputValues) => ProviderUpdateFormInputValues;
    onSuccess?: (fields: ProviderUpdateFormInputValues) => void;
    onError?: (fields: ProviderUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProviderUpdateFormInputValues) => ProviderUpdateFormInputValues;
    onValidate?: ProviderUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ProviderUpdateForm(props: ProviderUpdateFormProps): React.ReactElement;
