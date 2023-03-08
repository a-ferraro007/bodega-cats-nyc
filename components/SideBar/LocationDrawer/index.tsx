import SearchInput from '../SearchDrawer/SearchBar/SearchInput'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useReducer } from 'react'
import { useDebounce, useIsMobile } from '../../../hooks'
import { trpc } from '../../../utils/trpc'
import { useDrawerContext } from '../DrawerProvider'
import AddButton from '../SearchDrawer/SearchBar/AddButton'
import SearchDrawer from '../SearchDrawer/SearchResults'
import NewLocation from './NewLocation'
import MotionDiv from '../../MotionDiv'
import CloseArrow from '../../../svg/CloseArrow'

const LocationDrawer = () => {
  const {
    inputValue,
    setInputValue,
    isOpen,
    setIsOpen,
    setData,
    newLocation,
    newLocOpen,
    setNewLocOpen,
    setNewLocation,
  } = useDrawerContext()
  const isMobile = useIsMobile()

  const Variants = {
    location: {
      location_open: { x: 0, opacity: 1, transition: { delayChildren: 4 } },
      location_close: { x: '100%', opacity: 1 },
      location_mobile_close: { y: '100%', opacity: 1 },
      location_mobile_open: { y: 30, opacity: 1 },
    },
    button: {
      button_open: { opacity: 1 },
      button_close: { opacity: 0 },
    },
  }

  const handleBackBtnCick = () => {
    setNewLocation(null)
    setNewLocOpen(false)
  }

  return (
    <AnimatePresence>
      {newLocOpen && (
        <motion.div
          layout
          className={`absolute top-0 right-0 h-full w-full bg-white p-6 ${
            isMobile
              ? 'rounded-t-[15px] shadow-[0px_-5px_7px_rgb(0,0,0,.15)]'
              : ''
          }`}
          initial={isMobile ? 'location_mobile_close' : 'location_close'}
          animate={isMobile ? 'location_mobile_open' : 'location_open'}
          exit={isMobile ? 'location_mobile_close' : 'location_close'}
          transition={{
            delay: 0,
            ease: 'circOut',
            duration: 0.3,
          }}
          key={'location_open'}
          variants={Variants.location}
        >
          {newLocOpen && (
            <motion.button
              className={`absolute rounded-full bg-white p-1  ${
                !isMobile
                  ? 'left-[-1.5rem] top-0'
                  : 'right-[1.5rem] -top-6 z-10 shadow-[0px_-5px_7px_rgb(0,0,0,.15)]'
              }`}
              onClick={() => handleBackBtnCick()}
              initial={'button_close'}
              animate={'button_open'}
              exit={'button_close'}
              transition={{
                delay: 0,
                ease: 'circOut',
                duration: 0.35,
              }}
              key={'button_open'}
              variants={Variants.button}
            >
              <CloseArrow rotate={isMobile ? 'rotate(90)' : 'rotate(0)'} />
            </motion.button>
          )}
          <NewLocation />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LocationDrawer
