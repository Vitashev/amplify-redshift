/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Provider } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, ImageProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProductCardOverridesProps = {
    ProductCard?: PrimitiveOverrideProps<FlexProps>;
    image?: PrimitiveOverrideProps<ImageProps>;
    "Card Area"?: PrimitiveOverrideProps<FlexProps>;
    "Classic Long Sleeve T-Shirt"?: PrimitiveOverrideProps<TextProps>;
    desc?: PrimitiveOverrideProps<TextProps>;
    Quote?: PrimitiveOverrideProps<FlexProps>;
    price?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type ProductCardProps = React.PropsWithChildren<Partial<FlexProps> & {
    provider?: Provider;
} & {
    overrides?: ProductCardOverridesProps | undefined | null;
}>;
export default function ProductCard(props: ProductCardProps): React.ReactElement;
