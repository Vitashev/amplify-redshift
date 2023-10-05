/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ProductCardProps } from "./ProductCard";
import { CollectionProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProviderCardCollectionOverridesProps = {
    ProviderCardCollection?: PrimitiveOverrideProps<CollectionProps>;
    ProductCard?: ProductCardProps;
} & EscapeHatchProps;
export declare type ProviderCardCollectionProps = React.PropsWithChildren<Partial<CollectionProps<any>> & {
    items?: any[];
    overrideItems?: (collectionItem: {
        item: any;
        index: number;
    }) => ProductCardProps;
} & {
    overrides?: ProviderCardCollectionOverridesProps | undefined | null;
}>;
export default function ProviderCardCollection(props: ProviderCardCollectionProps): React.ReactElement;
