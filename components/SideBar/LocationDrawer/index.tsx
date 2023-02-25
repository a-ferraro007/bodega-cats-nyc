import SearchInput from './SearchInput'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useReducer } from 'react'
import { useDebounce, useIsMobile } from '../../../hooks'
import { trpc } from '../../../utils/trpc'
import { useDrawerContext } from '../DrawerProvider'
import AddButton from './AddButton'
import SearchDrawer from './SearchResults'
import NewLocation from './NewLocation'
import MotionDiv from '../../MotionDiv'

const LocationDrawer = () => {
  const {
    inputValue,
    setInputValue,
    isOpen,
    setIsOpen,
    setData,
    newLocation,
    newLocationIsOpen,
  } = useDrawerContext()
  const isMobile = useIsMobile()
  const debounce = useDebounce(inputValue, 500)
  const { data, isLoading } = trpc.searchByPlace.useQuery(debounce, {
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    setData(data)
  }, [data, setData])

  useEffect(() => {
    if (!isOpen) setInputValue('')
  }, [isOpen, setInputValue])

  useEffect(() => {
    console.log('new location: ', newLocation)
  }, [newLocation])

  const Variants = {
    location: {
      location_open: { x: 0, opacity: 1 },
      location_close: { x: '300%', opacity: 1 },
      location_mobile_close: { y: '300%', opacity: 1 },
      location_mobile_open: { y: 15, opacity: 1 },
    },
    search: {
      search_open: { opacity: 1 },
      search_close: { opacity: 0 },
    },
    input: {
      input_open: { opacity: 1 },
      input_close: { opacity: 0 },
    },
  }

  const AnimationProps = {
    location: {
      initial: isMobile ? 'location_mobile_close' : 'location_close',
      animate: isMobile ? 'location_mobile_open' : 'location_open', //{ x: 0, opacity: 1 },
      variants: { ...Variants.location },
      exit: { x: '200%', opacity: 0 },
      transition: {
        delay: 0,
        ease: 'circOut', //[0.16, 1, 0.3, 1], //[0.85, 0, 0.15, 1],
        duration: 0.35,
      },
    },
    search: {
      initial: { opacity: 0 },
      animate: !newLocationIsOpen ? { opacity: 1 } : { opacity: 0 },
      //variants: { ...Variants.search },
      exit: { opacity: 0 },
      transition: {
        delay: 0,
        ease: [0.16, 1, 0.3, 1], //[0.85, 0, 0.15, 1],
        duration: 0.2,
      },
    },
    input: {
      initial: 'input_close',
      animate: 'input_open',
      variants: { ...Variants.input },
      exit: { opacity: 0 },
      transition: {
        delay: 0,
        ease: 'circOut', //[0.16, 1, 0.3, 1], //[0.85, 0, 0.15, 1],
        duration: 0.3,
      },
    },
  }

  useReducer

  return (
    <AnimatePresence mode="popLayout">
      {!newLocationIsOpen && (
        <MotionDiv
          classNames="flex flex-row justify-end gap-3"
          framerKey={
            !newLocationIsOpen
              ? 'search-location-input-open'
              : 'search-location-input-close'
          }
        >
          <SearchInput />
          <div className="mb-4 max-w-[250px]">
            <AddButton />
          </div>
        </MotionDiv>
      )}
      {!newLocationIsOpen && (
        <MotionDiv
          {...AnimationProps.search}
          classNames="overflow-y-auto"
          framerKey={
            !newLocationIsOpen
              ? 'search-drawer-location-open'
              : 'search-drawer-location-close'
          }
        >
          <SearchDrawer />
        </MotionDiv>
      )}
      {newLocation && newLocationIsOpen && (
        <MotionDiv
          {...AnimationProps.location}
          classNames="h-full"
          framerKey={
            newLocation && newLocationIsOpen
              ? 'new-location-drawer-open'
              : 'new-location-drawer-close'
          }
        >
          <NewLocation />
        </MotionDiv>
      )}
    </AnimatePresence>
  )
}

export default LocationDrawer
