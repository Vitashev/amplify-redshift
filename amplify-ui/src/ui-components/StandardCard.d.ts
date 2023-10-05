/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StandardCardOverridesProps = {
    StandardCard?: PrimitiveOverrideProps<FlexProps>;
    "Card Area"?: PrimitiveOverrideProps<FlexProps>;
    "Text Group"?: PrimitiveOverrideProps<FlexProps>;
    Name?: PrimitiveOverrideProps<TextProps>;
    "$99 USD"?: PrimitiveOverrideProps<TextProps>;
    Address?: PrimitiveOverrideProps<TextProps>;
    "4bds 3 ba 2,530 sqft - Active38672735"?: PrimitiveOverrideProps<TextProps>;
    "City/Town"?: PrimitiveOverrideProps<TextProps>;
    "4bds 3 ba 2,530 sqft - Active38672737"?: PrimitiveOverrideProps<TextProps>;
    State?: PrimitiveOverrideProps<TextProps>;
    "832 34th Ave, Seattle, WA 9812238672738"?: PrimitiveOverrideProps<TextProps>;
    "Zip Code"?: PrimitiveOverrideProps<TextProps>;
    "832 34th Ave, Seattle, WA 9812238672740"?: PrimitiveOverrideProps<TextProps>;
    "Phone Number"?: PrimitiveOverrideProps<TextProps>;
    "832 34th Ave, Seattle, WA 9812238672742"?: PrimitiveOverrideProps<TextProps>;
    "Certification Number"?: PrimitiveOverrideProps<TextProps>;
    "832 34th Ave, Seattle, WA 9812238672744"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type StandardCardProps = React.PropsWithChildren<Partial<FlexProps> & {
    providerName?: String;
    providerAddress?: String;
    citytown?: String;
    state?: String;
    zipCode?: String;
    telephoneNumber?: String;
    cmsCertificationNumberCcn?: Number;
} & {
    overrides?: StandardCardOverridesProps | undefined | null;
}>;
export default function StandardCard(props: StandardCardProps): React.ReactElement;
