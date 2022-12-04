import Desktop from './Desktop'
import Mobile from './Mobile'
import Map from '../Map'
import { useFeatures } from '../../hooks/Features'
import { useUser, useSessionContext } from '@supabase/auth-helpers-react'
import { useState, useEffect } from 'react'
import { useStore } from '../../store'

const Layout = ({ children }) => {
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
    console.log('data', data)
  })
  const classNames =
    'h-3/4 max-h-[900px] hidden md:flex flex-col  bg-ice mt-3 mx-3 md:mt-6 md:mx-8 rounded-[25px] p-5 md:pt-5 md:p-7'
  return (
    <>
      <div className="h-3/4 max-h-[900px] bg-ice mt-3 mx-3 md:mt-6 md:mx-8 rounded-[25px] p-5 md:pt-5 md:p-7">
        <Mobile>{children}</Mobile>
      </div>
    </>
  )
}

export default Layout
