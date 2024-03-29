import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useCardListSize } from '../../../hooks'
import { useDrawerContext } from '../DrawerProvider'
import LoadingList from '../LoadingList'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'

const SearchDrawer = () => {
  const size = useCardListSize('height')
  const { inputValue, isLoading, data } = useDrawerContext()
  const Variants = {
    search: {
      search_open: { opacity: 1 },
      search_close: { opacity: 0 },
    },
  }

  return (
    <>
      <SearchBar />
      {data.length > 0 && (
        <AnimatePresence>
          {!isLoading ? (
            <motion.div
              className="h-full overflow-hidden"
              transition={{
                delay: 0,
                ease: 'circOut',
                duration: 0.25,
              }}
              key={'search-drawer-location-close'}
              variants={Variants.search}
            >
              <SearchResults data={data} />
            </motion.div>
          ) : (
            <LoadingList
              fullWidth={true}
              size={size ? size : 10}
              flexDirection={'flex-col'}
              scrollDirection={'overflow-y-hidden'}
              isLoading={isLoading}
              fKey={'search-loading'}
            />
          )}
        </AnimatePresence>
      )}
      {inputValue.length > 0 && data.length === 0 && !isLoading && (
        //add link to submit bug report for missing location
        <p className="w-full text-center font-nunito font-normal">
          no location found 😿
        </p>
      )}
    </>
  )
}

export default SearchDrawer
