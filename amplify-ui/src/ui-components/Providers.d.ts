/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ProvidersInputValues = {};
export declare type ProvidersValidationValues = {};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProvidersOverridesProps = {
    ProvidersGrid?: PrimitiveOverrideProps<GridProps>;
} & EscapeHatchProps;
export declare type ProvidersProps = React.PropsWithChildren<{
    overrides?: ProvidersOverridesProps | undefined | null;
} & {
    onSubmit: (fields: ProvidersInputValues) => void;
    onChange?: (fields: ProvidersInputValues) => ProvidersInputValues;
    onValidate?: ProvidersValidationValues;
} & React.CSSProperties>;
export default function Providers(props: ProvidersProps): React.ReactElement;
