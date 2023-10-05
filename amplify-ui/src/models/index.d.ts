import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";



type EagerProvider = {
  readonly id: string;
  readonly cms_certification_number_ccn: number;
  readonly provider_name?: string | null;
  readonly provider_address?: string | null;
  readonly citytown?: string | null;
  readonly state?: string | null;
  readonly zip_code?: number | null;
  readonly telephone_number?: number | null;
}

type LazyProvider = {
  readonly id: string;
  readonly cms_certification_number_ccn: number;
  readonly provider_name?: string | null;
  readonly provider_address?: string | null;
  readonly citytown?: string | null;
  readonly state?: string | null;
  readonly zip_code?: number | null;
  readonly telephone_number?: number | null;
}

export declare type Provider = LazyLoading extends LazyLoadingDisabled ? EagerProvider : LazyProvider

export declare const Provider: (new (init: ModelInit<Provider>) => Provider)

