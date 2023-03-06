import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useCardListSize } from '../../../hooks'
import { useDrawerContext } from '../DrawerProvider'
import LoadingList from '../LoadingList'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'

const SearchDrawer = () => {
  const { inputValue, newLocation, newLocOpen, data } = useDrawerContext()
  const Variants = {
    search: {
      search_open: { opacity: 1 },
      search_close: { opacity: 0 },
    },
  }

  return (
    <>
      {!newLocOpen && (
        <AnimatePresence>
          <SearchBar />
          {data?.length > 0 && (
            <motion.div
              className="h-full overflow-hidden"
              initial={'search_close'}
              animate={data?.length > 0 ? 'search_open' : 'search_close'}
              exit={{ opacity: 0 }}
              transition={{
                delay: 0,
                ease: 'circOut',
                duration: 0.2,
              }}
              key={'search-drawer-location-close'}
              variants={Variants.search}
            >
              <SearchResults />
            </motion.div>
          )}
          {inputValue.length > 0 && data?.length === 0 && (
            //add link to submit bug report for missing location
            <p className="w-full text-center font-nunito font-normal">
              no location found 😿
            </p>
          )}
        </AnimatePresence>
      )}
    </>
  )
}

export default SearchDrawer
