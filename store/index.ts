import mapboxgl from 'mapbox-gl'
import { DrawerState, FeatureDrawerState } from './../constants/types'
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
  searchFocus: boolean
  show: boolean
  currentPosition: {}
  setShow: (show: boolean) => void
  setDrawerOpen: (isDrawerOpen: boolean) => void
  setDrawerState: (drawerState: DrawerState) => void
  setFeatureDrawerState: (featureDrawerState: FeatureDrawerState) => void
  updateMapState: (featureMapUpdate: any) => void
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
  searchFocus: false,
  show: false,
  currentPosition: {},
  setDrawerOpen: (isDrawerOpen: boolean) => set(() => ({ isDrawerOpen: isDrawerOpen })),
  setDrawerState: (drawerState: DrawerState) => set(() => ({ drawerState: drawerState })),
  setFeatureDrawerState: (featureDrawerState: FeatureDrawerState) =>
    set(() => ({ featureDrawerState: featureDrawerState })),
  updateMapState: (mapUpdate: any) => set(() => ({ featureMap: mapUpdate })),
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
