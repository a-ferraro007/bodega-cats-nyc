import { z } from 'zod'

export const FormInputs = z.object({
  name: z.string(),
  address: z.string(),
  rating: z.string(),
  search: z.string(),
  file: z.string().optional()
})
export type FormInputs = z.infer<typeof FormInputs>

export const zLngLat = z.object({
  lng: z.number(),
  lat: z.number()
})
type lnglat = z.infer<typeof zLngLat>

export interface LngLat extends lnglat {}

export const CatProperties = z.object({
  name: z.string(),
  rating: z.number(),
  image: z.string(),
  locality: z.string()
})
export type CatProperties = z.infer<typeof CatProperties>

//CHANGE TO DATA TRANSPORT TYPE
export const MapBoxFeature = z.object({
  feature_id: z.string(),
  user_id: z.string(),
  address: z.string(),
  geo_json: z.any(),
  cat_id: z.number()
})
export type MapBoxFeature = z.infer<typeof MapBoxFeature>

const ParsedFeature = z.object({
  feature_id: z.string(),
  name: z.string(),
  center: z.array(z.number()),
  address: z.string(),
  locality: z.string()
})
export type ParsedFeature = z.infer<typeof ParsedFeature>

export interface ParsedAddressFeature {
  feature_id: string
  name: string
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

export interface NewFeatureMutation {
  CatProperties: CatProperties
  MapBoxFeature: MapBoxFeature
}

export enum Borough {
  Manhattan = 'Manhattan',
  Queens = 'Queens',
  Brooklyn = 'Brooklyn',
  Bronx = 'Bronx',
  StatenIsland = 'Staten Island'
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
  lnglat: LngLat
  address: string
}

export interface ParsedSearchLocation {
  feature_id: string
  address: string
}
