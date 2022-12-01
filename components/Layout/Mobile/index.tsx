import { AnimatePresence } from 'framer-motion'
import { useFeatures } from '../../../hooks/Features'
import { useStore } from '../../../store'
import Drawer from '../../Drawer'

import FeatureDrawer from '../../Drawer/FeatureDrawer'
import SearchDrawer from '../../Drawer/SearchDrawer'
import SearchBar from '../../SearchBar'
import { useUser, useSessionContext } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

const Mobile = ({ children }: any) => {
  const { data } = useFeatures()
  const [_, setAuth] = useState(false)
  const user = useUser()
  const { supabaseClient, session } = useSessionContext()
  const authState = useStore((state) => state.authState)
  const searchMarker = useStore((state) => state.searchMarker)
  const setSearchMarker = useStore((state) => state.setSearchMarker)
  const setDrawerState = useStore((state) => state.setDrawerState)
  const { featureDrawerIsActive, searchDrawerIsActive } = useStore((state) => state.drawerState)
  const query = useStore((state) => state.searchQuery)
  const searchFocus = useStore((state) => state.searchFocus)
  const map = useStore((state) => state.mapRef)
  const [addBtn, setAddBtn] = useState(false)
  useEffect(() => {
    console.log('data', searchDrawerIsActive, searchFocus)
  })

  return (
    <div className="h-full flex flex-col gap-1 bg-ice rounded-t-[15px] justify-between">
      <div className="flex-grow">{children}</div>
      <div className="max-w-[350px] w-full ">
        <SearchBar />
      </div>
      <AnimatePresence>
        {((searchDrawerIsActive && searchFocus) || searchDrawerIsActive) && (
          <Drawer
            key={'drawer-mobile'}
            motionKey="search-mobile"
            props={{
              initial: { height: '0px', opacity: 0 },
              animate: { height: '65%', opacity: 1 },
              exit: { height: '0px', opacity: 0 },
              transition: { type: 'tween', duration: 0.3 }
            }}
          >
            <SearchDrawer />
          </Drawer>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Mobile
