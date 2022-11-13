export interface FormInputs {
  name: string
  address: string
  rating: number
  file?: string
}

export interface NewLocation {
  feature_id: string
  name: string
  center: Array<Number>
  address: string
  locality: string
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
  LocationData?: NewLocation
  FeatureData?: any
}

export interface NewFeatureMutation {
  CatProperties: CatProperties
  MapBoxFeature: MapBoxFeature
}
