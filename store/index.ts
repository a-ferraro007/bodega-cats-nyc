import mapboxgl from 'mapbox-gl'
import {
  DrawerState,
  Feature,
  FeatureDrawerState,
  MarkerFeature,
  SearchLocation,
} from './../constants/types'
import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

type Marker<T> = T | null

interface FeatureStore {
  features: Map<string, MarkerFeature>
  isLoading: boolean
  setFeatures: (features: Map<string, MarkerFeature>) => void
  setIsLoading: (isLoading: boolean) => void
}

interface AddressSearchStore {
  searchQuery: string
  searchResult: any
  searchFocus: boolean
  searchMarker: Marker<mapboxgl.Marker>
  searchLocationState: SearchLocation
  setSearchLocationState: (searchLocation: SearchLocation) => void
  setSearchQuery: (searchQuery: string) => void
  setSearchFocus: (setSearchFocus: boolean) => void
  setSearchResult: (result: any) => void
  setSearchMarker: (searchMarker: Marker<mapboxgl.Marker>) => void
}

const addressSearchStore = (set: any) => ({
  searchQuery: '',
  searchResult: {},
  searchFocus: false,
  searchMarker: null,
  searchLocationState: <SearchLocation>{},
  setSearchLocationState: (searchLocationState: SearchLocation) =>
    set(() => ({ searchLocationState: searchLocationState })),
  setSearchQuery: (searchQuery: string) =>
    set(() => ({ searchQuery: searchQuery })),
  setSearchFocus: (searchFocus: boolean) =>
    set(() => ({ searchFocus: searchFocus })),
  setSearchResult: (result: any) => set(() => ({ result: result })),
  setSearchMarker: (searchMarker: Marker<mapboxgl.Marker>) => ({
    ...searchMarker,
  }),
})

const featureStore = (set: any) => ({
  features: new Map<string, MarkerFeature>(),
  isLoading: false,
  setFeatures: (features: Map<String, MarkerFeature>) =>
    set(() => ({ features: new Map(features) })),
  setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
})

interface StoreState {
  mapRef: mapboxgl.Map
  searchMarker: Marker<mapboxgl.Marker>
  authState: boolean

  show: boolean
  showMobileMap: boolean

  setShowMobileMap: (showMobileMap: boolean) => void

  setShow: (show: boolean) => void
  setMapRef: (mapRef: mapboxgl.Map) => void
  setAuthState: (authState: boolean) => void
}

const store = (set: any) => ({
  mapRef: <mapboxgl.Map>{},
  searchMarker: null,
  authState: false,
  show: false,
  showMobileMap: false,
  setShowMobileMap: (showMobileMap: boolean) =>
    set(() => ({
      showMobileMap: showMobileMap,
    })),

  setMapRef: (mapRef: mapboxgl.Map) => set(() => ({ mapRef: mapRef })),
  setAuthState: (authState: boolean) => set(() => ({ authState: authState })),
  setShow: (show: boolean) => set(() => ({ show: show })),
})

export const useStore = create<StoreState>()(
  subscribeWithSelector<StoreState>(store)
)
export const useFeatureStore = create<FeatureStore>()(
  subscribeWithSelector<FeatureStore>(featureStore)
)
export const useAddressSearchStore = create<AddressSearchStore>()(
  subscribeWithSelector<AddressSearchStore>(addressSearchStore)
)
