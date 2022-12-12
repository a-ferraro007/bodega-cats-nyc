import { AnimatePresence, motion } from 'framer-motion'
import { useFeatures } from '../../../hooks/Features'
import { useStore } from '../../../store'
import Drawer from '../../Drawer'
import Map from '../../Map'
import FeatureDrawer from '../../Drawer/FeatureDrawer'
import SearchDrawer from '../../Drawer/SearchDrawer'
import SearchBar from '../../SearchBar'
import { useUser, useSessionContext } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

const Desktop = ({ children }: any) => {
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
    <div className="h-full flex flex-col md:flex-col-reverse gap-1 md:gap-4 bg-ice rounded-t-[15px]">
      <div className="flex-grow md:h-full md:flex md:gap-4 md:overflow-hidden">
        <AnimatePresence>
          {((searchDrawerIsActive && searchFocus) || searchDrawerIsActive) && (
            <motion.div
              className="hidden max-w-[325px] md:block"
              key={'drawer'}
              {...{
                initial: { width: '0px', opacity: 0 },
                animate: { width: '100%', opacity: 1 },
                exit: { width: '0px', opacity: 0 },
                transition: { type: 'tween', duration: 0.3 }
              }}
            >
              <Drawer>
                <SearchDrawer key={'searchComponent'} />
              </Drawer>
            </motion.div>
          )}
        </AnimatePresence>
        {children}
        <AnimatePresence>
          {featureDrawerIsActive && (
            <motion.div
              className="hidden max-w-[325px] md:block"
              key="feature"
              {...{
                initial: { width: '0px', opacity: 0 },
                animate: { width: '100%', opacity: 1 },
                exit: { width: '0px', opacity: 0 },
                transition: { type: 'tween', duration: 0.3 }
              }}
            >
              <Drawer>
                <FeatureDrawer key={'featureComponent'} />
              </Drawer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="block md:flex justify-between">
        <div className="max-w-[350px] w-full ">
          <SearchBar />
        </div>
        {featureDrawerIsActive && (
          <button
            className="self-center translate-y-2 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 py-2 px-3 rounded-md transition-all -300 hidden md:block"
            onClick={(event: any) => {
              event.preventDefault()
              //if (searchMarker) {
              //  searchMarker.remove()
              //  setSearchMarker(null)
              //}
              if (query.length === 0) {
                setDrawerState({ searchDrawerIsActive: false, featureDrawerIsActive: false })
              } else {
                setDrawerState({ searchDrawerIsActive: true, featureDrawerIsActive: false })
              }
            }}
          >
            <svg
              width="15"
              height="18"
              viewBox="0 0 27 30"
              fill="none"
              className="hover:fill-black focus:fill-black"
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(180)"
            >
              <path
                d="M0.585786 13.5858C-0.195262 14.3668 -0.195262 15.6332 0.585786 16.4142L13.3137 29.1421C14.0948 29.9232 15.3611 29.9232 16.1421 29.1421C16.9232 28.3611 16.9232 27.0948 16.1421 26.3137L4.82843 15L16.1421 3.68629C16.9232 2.90524 16.9232 1.63891 16.1421 0.857864C15.3611 0.0768158 14.0948 0.0768158 13.3137 0.857864L0.585786 13.5858ZM27 13L2 13V17L27 17V13Z"
                fill="#242424"
              />
            </svg>
          </button>
        )}
      </div>
      <AnimatePresence>
        {((searchDrawerIsActive && searchFocus) || searchFocus) && (
          <motion.div
            className="block md:hidden "
            key={'drawer-mobile'}
            {...{
              initial: { height: '0px', opacity: 0 },
              animate: { height: '65%', opacity: 1 },
              exit: { height: '0px', opacity: 0 },
              transition: { type: 'tween', duration: 0.3 }
            }}
          >
            <Drawer>
              <SearchDrawer />
            </Drawer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Desktop
