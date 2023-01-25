import mapboxgl from 'mapbox-gl'
import { DrawerState, FeatureDrawerState, SearchLocation } from './../constants/types'
import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

type Marker<T> = T | null
interface StoreState {
  features: Map<any, any>
  drawerState: DrawerState
  isDrawerOpen: boolean
  mapRef: mapboxgl.Map
  searchMarker: Marker<mapboxgl.Marker>
  featureDrawerState: FeatureDrawerState
  authState: boolean
  searchQuery: string
  searchResult: any
  searchFocus: boolean
  show: boolean
  currentPosition: {}
  showMobileMap: boolean
  searchLocationState: SearchLocation
  setSearchLocationState: (searchLocation: SearchLocation) => void
  setShowMobileMap: (showMobileMap: boolean) => void
  setSearchResult: (result: any) => void
  setShow: (show: boolean) => void
  setDrawerOpen: (isDrawerOpen: boolean) => void
  setDrawerState: (drawerState: DrawerState) => void
  setFeatureDrawerState: (featureDrawerState: FeatureDrawerState) => void
  updateMapState: (features: any) => void
  setMapRef: (mapRef: mapboxgl.Map) => void
  setSearchMarker: (searchMarker: Marker<mapboxgl.Marker>) => void
  setAuthState: (authState: boolean) => void
  setSearchQuery: (searchQuery: string) => void
  setSearchFocus: (setSearchFocus: boolean) => void
  setCurrentPosition: (currentPosition: {}) => void
}

const store = (set: any) => ({
  features: new Map(),
  drawerState: <DrawerState>{
    searchDrawerIsActive: false,
    featureDrawerIsActive: false
  },
  isDrawerOpen: false,
  mapRef: <mapboxgl.Map>{},
  searchMarker: null,
  featureDrawerState: <FeatureDrawerState>{},
  authState: false,
  searchQuery: '',
  searchResult: {},
  searchFocus: false,
  show: false,
  currentPosition: {},
  showMobileMap: false,
  searchLocationState: <SearchLocation>{},
  setSearchLocationState: (searchLocationState: SearchLocation) =>
    set(() => ({ searchLocationState: searchLocationState })),
  setShowMobileMap: (showMobileMap: boolean) =>
    set(() => ({
      showMobileMap: showMobileMap
    })),
  setSearchResult: (result: any) => set(() => ({ result: result })),
  setDrawerOpen: (isDrawerOpen: boolean) => set(() => ({ isDrawerOpen: isDrawerOpen })),
  setDrawerState: (drawerState: DrawerState) => set(() => ({ drawerState: drawerState })),
  setFeatureDrawerState: (featureDrawerState: FeatureDrawerState) =>
    set(() => ({ featureDrawerState: featureDrawerState })),
  updateMapState: (features: any) => set(() => ({ features: new Map(features) })),
  setMapRef: (mapRef: mapboxgl.Map) => set(() => ({ mapRef: mapRef })),
  setSearchMarker: (searchMarker: Marker<mapboxgl.Marker>) =>
    set(() => (searchMarker ? { searchMarker: searchMarker } : null)),
  setAuthState: (authState: boolean) => set(() => ({ authState: authState })),
  setSearchQuery: (searchQuery: string) => set(() => ({ searchQuery: searchQuery })),
  setSearchFocus: (searchFocus: boolean) => set(() => ({ searchFocus: searchFocus })),
  setShow: (show: boolean) => set(() => ({ show: show })),
  setCurrentPosition: (currentPosition: {}) => set(() => ({ currentPosition: currentPosition }))
})

export const useStore = create<StoreState>()(subscribeWithSelector<StoreState>(store))
