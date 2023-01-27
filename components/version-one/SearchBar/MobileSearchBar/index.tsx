import { ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react'
import { useStore } from '../../../../store'
import { FeatureDrawerState } from '../../../../constants/types'
import { useDebounce, useSearch } from '../../../../hooks'
import { newMarker } from '../../../../utils/MapMarker'
import { AnimatePresence, motion } from 'framer-motion'
import Drawer from '../../Drawer'
import SearchDrawer from '../../Drawer/SearchDrawer'

const MobileSearchBar = () => {
  const query = useStore((state) => state.searchQuery)
  const debounce = useDebounce(query, 250)
  const { data, isFetching, isLoading, isSuccess } = useSearch(debounce)
  const map = useStore((state) => state.mapRef)
  const featuresMap = useStore((state) => state.features)
  const setFeatureDrawerState = useStore((state) => state.setFeatureDrawerState)
  const setDrawerState = useStore((state) => state.setDrawerState)
  const { searchDrawerIsActive, featureDrawerIsActive } = useStore((state) => state.drawerState)
  const setSearchMarker = useStore((state) => state.setSearchMarker)
  const searchMarker = useStore((state) => state.searchMarker)
  const setQuery = useStore((state) => state.setSearchQuery)
  const setSearchFocus = useStore((state) => state.setSearchFocus)
  const searchFocus = useStore((state) => state.searchFocus)
  const isFocused = useRef(null)

  const HandleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '' && searchMarker) {
      searchMarker.remove()
    }
    if (e.target.value === '' && searchDrawerIsActive) {
      //setDrawerState({ searchDrawerIsActive: false, featureDrawerIsActive })
    }
    setQuery(e.target.value)
  }

  const HandleInputEnterEvent = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && data && data.length > 0) {
      map.flyTo({ center: data[0].Feature.geometry.coordinates })
    }
  }

  const variants = {
    container: {
      active: { top: 0, height: '100%' },
      close: { bottom: '2.5rem', height: '0px' }
    },
    input: {
      active: { width: '100%' },
      close: { width: '75%' }
    }
  }

  return (
    <>
      <motion.div
        className="absolute z-100 bottom-10 right-0 left-0 bg-ice"
        animate={searchFocus || searchDrawerIsActive ? 'active' : 'close'}
        variants={variants.container}
        transition={{ type: 'tween', duration: 0.35 }}
      >
        <motion.div
          className={`mt-3 bg-white mx-auto px-2 py-2 w-3/4 min-w-[200px] rounded-[25px] shadow-4xl`}
          animate={searchFocus || searchDrawerIsActive ? 'active' : 'close'}
          variants={variants.input}
          transition={{ type: 'spring', duration: 0.35, delay: 0.3 }}
        >
          <input
            className="w-full h-10 px-4 text-graphite text-sm font-bold font-nunito rounded-[15px] outline-none  transition-all duration-500 border-[1px] border-solid border-[rgba(0,0,0,.12)]"
            placeholder="find a cat"
            id={'mobile-search-input'}
            ref={isFocused}
            required={true}
            type="search"
            value={query}
            onChange={(e) => HandleOnChange(e)}
            onKeyDown={(e) => HandleInputEnterEvent(e)}
            onFocus={() => {
              setSearchFocus(true)
            }}
            onBlur={() => {
              setSearchFocus(false)
              if (searchDrawerIsActive && query.length === 0) {
                setDrawerState({ searchDrawerIsActive: false, featureDrawerIsActive })
              }
            }}
            autoFocus={true}
            autoComplete="none"
          />
        </motion.div>
        {(searchFocus || searchDrawerIsActive) && (
          //<Drawer>
          <SearchDrawer />
          //</Drawer>
        )}
        {/*<AnimatePresence>
          {(searchFocus || searchDrawerIsActive) && (
            <motion.div
              className="block md:hidden "
              key={'drawer-mobilee'}
              {...{
                initial: { height: '0px', opacity: 0 },
                animate: { height: '100%', opacity: 1 },
                exit: { height: '0px', opacity: 0 },
                transition: { type: 'tween', duration: 0.3 }
              }}
            >
              <Drawer>
                <SearchDrawer />
              </Drawer>
            </motion.div>
          )}
        </AnimatePresence>*/}
      </motion.div>
    </>
  )
}

export default MobileSearchBar
