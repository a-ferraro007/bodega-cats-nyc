import { AnimatePresence, motion } from 'framer-motion'
import { useIsMobile } from '../../../hooks'
import { useDrawerContext } from '../DrawerProvider'
import NewLocation from './NewLocation'

const LocationDrawer = () => {
  const { newLocOpen } = useDrawerContext()
  const isMobile = useIsMobile()

  const Variants = {
    location: {
      location_open: { x: 0, opacity: 1, transition: { delayChildren: 4 } },
      location_close: { x: '100%', opacity: 1 },
      location_mobile_close: { y: '100%', opacity: 1 },
      location_mobile_open: { y: 25, opacity: 1 },
    },
    button: {
      button_open: { opacity: 1 },
      button_close: { opacity: 0 },
    },
  }

  return (
    <AnimatePresence>
      {newLocOpen && (
        <motion.div
          layout
          className={`absolute top-0 right-0  h-full w-full bg-seasalt p-2 pt-0 ${
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
          <NewLocation />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LocationDrawer
