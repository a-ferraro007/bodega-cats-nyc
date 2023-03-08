//import { NewFeatureMutation } from './types';
import { z } from 'zod'

export const FormInputs = z.object({
  name: z.string(),
  address: z.string(),
  rating: z.string(),
  search: z.string(),
  file: z.string().optional(),
})

export const zLngLat = z.object({
  lng: z.number(),
  lat: z.number(),
})

export const CatProperties = z.object({
  created_at: z.string().optional(),
  id: z.number().optional(),
  name: z.string(),
  rating: z.number(),
  image: z.string(),
  locality: z.string(),
})

export const MapBoxFeature = z.object({
  feature_id: z.string(),
  user_id: z.string(),
  address: z.string(),
  geo_json: z.any(),
  //cat_id: z.optional(z.number()) //
})

export const ParsedFeature = z.object({
  feature_id: z.string(),
  name: z.string(),
  center: z.array(z.number()),
  address: z.string(),
  locality: z.string(),
})

export const zNewFeatureMutation = z.object({
  MapBoxFeature: MapBoxFeature,
  CatProperties: CatProperties,
})

export const zFeature = CatProperties.extend({
  MapBox_Feature: z.array(MapBoxFeature),
})

export const zGeometry = z.object({
  coordinates: z.array(z.number()).length(2),
  type: z.string(),
})

export const zNewLocation = z.object({
  ParsedFeature: ParsedFeature,
  Feature: z.object({
    id: z.string(),
    type: z.string(),
    geometry: zGeometry,
    place_type: z.array(z.string()),
    properties: z
      .object({
        address: z.string(),
        name: z.string(),
        rating: z.number(),
        image: z.string().optional(),
      })
      .optional(),
  }),
})

export const zRowId = z.object({
  id: z.number(),
})

export interface ParsedAddressFeature {
  feature_id: string
  name: string
  lnglat: LngLat
}

//export interface FeatureData {
//  id: string
//  name: string
//  geometry: { coordinates: Array<Number>; type: string }
//  place_type: Array<string>
//  type: string
//}

export interface DrawerState {
  searchDrawerIsActive: boolean
  featureDrawerIsActive: boolean
}

export interface FeatureDrawerProps {
  handleStateReset: () => void
}

export interface FeatureDrawerState {
  ParsedFeature?: ParsedFeature
  Feature?: any
}

export enum Borough {
  Manhattan = 'Manhattan',
  Queens = 'Queens',
  Brooklyn = 'Brooklyn',
  Bronx = 'Bronx',
  StatenIsland = 'Staten Island',
}

export type Coordinates = {
  longitude: number
  latitude: number
}

//export interface LngLat {
//  lng: number
//  lat: number
//}
export interface SearchLocation {
  feature_id: string
  lnglat: LngLat
  address: string
}

export interface ParsedSearchLocation {
  feature_id: string
  address: string
}

export interface MarkerFeature {
  marker: mapboxgl.Marker
  feature: Feature
}

export type CardProps = {
  feature: Feature
  classNames: { listItem: string; cardContainer: string }
}

type lnglat = z.infer<typeof zLngLat>
export type CatProperties = z.infer<typeof CatProperties>
export type FormInputs = z.infer<typeof FormInputs>
export type ParsedFeature = z.infer<typeof ParsedFeature>
export type MapBoxFeature = z.infer<typeof MapBoxFeature>
export type NewLocation = z.infer<typeof zNewLocation>
export type RowId = z.infer<typeof zRowId>
export type NewFeatureMutation = z.infer<typeof zNewFeatureMutation>
export type Feature = z.infer<typeof zFeature>
export interface LngLat extends lnglat {}
export interface TopFeatureInterface extends Feature {}
export interface FeatureInterface extends Feature {
  MapBox_Feature: MapBoxFeature[]
}
export interface NewLocationInterface extends NewLocation {}
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Cat_Properties: {
        Row: {
          created_at: string | null
          id: number
          image: string | null
          locality: string | null
          name: string | null
          rating: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          image?: string | null
          locality?: string | null
          name?: string | null
          rating?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          image?: string | null
          locality?: string | null
          name?: string | null
          rating?: number | null
        }
      }
      MapBox_Feature: {
        Row: {
          address: string | null
          cat_id: number | null
          created_at: string | null
          feature_id: string
          geo_json: Json
          id: number
          locality: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          cat_id?: number | null
          created_at?: string | null
          feature_id: string
          geo_json: Json
          id?: number
          locality?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          cat_id?: number | null
          created_at?: string | null
          feature_id?: string
          geo_json?: Json
          id?: number
          locality?: string | null
          user_id?: string
        }
      }
      profiles: {
        Row: {
          email: string | null
          id: string
        }
        Insert: {
          email?: string | null
          id: string
        }
        Update: {
          email?: string | null
          id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
