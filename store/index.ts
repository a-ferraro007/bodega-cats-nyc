import mapboxgl from 'mapbox-gl'
import {
  ActivePopup,
  //ActivePopup,
  FeatureMarker,
  SearchLocation,
} from './../constants/types'
import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

type Marker<T> = T | null

interface FeatureStore {
  features: Map<string, FeatureMarker>
  topFeatures: Map<string, FeatureMarker>
  isLoading: boolean
  setFeatures: (features: Map<string, FeatureMarker>) => void
  setTopFeatures: (topFeatures: Map<string, FeatureMarker>) => void
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
  features: new Map<string, FeatureMarker>(),
  topFeatures: new Map<string, FeatureMarker>(),
  isLoading: true,
  setFeatures: (features: Map<String, FeatureMarker>) =>
    set(() => ({ features: new Map(features) })),
  setTopFeatures: (topFeatures: any) =>
    set(() => ({ topFeatures: topFeatures })),
  setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
})

interface AuthStore {
  isAuthenticated: boolean
  setIsAuthenticated: (authState: boolean) => void
}

const authStore = (set: any) => ({
  isAuthenticated: false,
  setIsAuthenticated: (authState: boolean) =>
    set(() => ({ authState: authState })),
})

interface StoreState {
  mapRef: mapboxgl.Map
  activePopup: ActivePopup
  searchMarker: Marker<mapboxgl.Marker>
  authState: boolean

  show: boolean
  showMobileMap: boolean

  setShowMobileMap: (showMobileMap: boolean) => void
  setActivePopup: (activePopup: ActivePopup) => void
  setShow: (show: boolean) => void
  setMapRef: (mapRef: mapboxgl.Map) => void
  setAuthState: (authState: boolean) => void
}

const store = (set: any) => ({
  mapRef: <mapboxgl.Map>{},
  activePopup: <ActivePopup>{},
  searchMarker: <Marker<mapboxgl.Marker>>{},
  authState: false,
  show: false,
  showMobileMap: false,
  setShowMobileMap: (showMobileMap: boolean) =>
    set(() => ({
      showMobileMap: showMobileMap,
    })),
  setActivePopup: (activePopup: ActivePopup) =>
    set(() => ({ activePopup: activePopup })),
  setMapRef: (mapRef: mapboxgl.Map) => set(() => ({ mapRef: mapRef })),
  setAuthState: (authState: boolean) => set(() => ({ authState: authState })),
  setShow: (show: boolean) => set(() => ({ show: show })),
})

export const useStore = create<StoreState>()(
  subscribeWithSelector<StoreState>(store)
)
export const useAuthStore = create<AuthStore>()(
  subscribeWithSelector<AuthStore>(authStore)
)
export const useFeatureStore = create<FeatureStore>()(
  subscribeWithSelector<FeatureStore>(featureStore)
)
export const useAddressSearchStore = create<AddressSearchStore>()(
  subscribeWithSelector<AddressSearchStore>(addressSearchStore)
)
