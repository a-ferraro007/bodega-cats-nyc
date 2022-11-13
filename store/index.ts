import { DrawerState } from './../constants/types'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface StoreState {
  featureMap: any
  drawerState: DrawerState
  isDrawerOpen: boolean
  setDrawerOpen: (isDrawerOpen: boolean) => void
  setDrawerState: (drawerState: DrawerState) => void
  updateMapState: (featureMapUpdate: any) => void
}

const store = (set: any) => ({
  featureMap: new Map(),
  drawerState: <DrawerState>{},
  isDrawerOpen: false,
  setDrawerOpen: (isDrawerOpen: boolean) => set(() => ({ isDrawerOpen: isDrawerOpen })),
  setDrawerState: (drawerState: DrawerState) => set(() => ({ drawerState: drawerState })),
  updateMapState: (mapUpdate: any) => set(() => ({ featureMap: mapUpdate }))
})

export const useStore = create<StoreState>()(store)
