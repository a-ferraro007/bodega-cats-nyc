export interface FormInputs {
  name: string
  address: string
  rating: number
  search: string
  file?: string
}

export interface ParsedFeature {
  feature_id: string
  name: string
  center: Array<Number>
  address: string
  locality: string
}

export interface FeatureData {
  id: string
  name: string
  geometry: { coordinates: Array<Number>; type: string }
  place_type: Array<string>
  type: string
}

export interface CatProperties {
  name: string
  rating: number
  image: string
  locality: string
}

export interface MapBoxFeature {
  feature_id: string
  user_id: string
  address: string
  geo_json: any
  cat_id?: number
}

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
