import { useStore } from '../../store'
import { AnimatePresence } from 'framer-motion'
import LocationDrawer from './LocationDrawer'
import { DrawerProvider, useDrawerContext } from './DrawerProvider'
import ListDrawer from './ListDrawer'
import CloseArrow from '../../svg/CloseArrow'

const SideBar = () => {
  const showMobileMap = useStore((state) => state.showMobileMap)
  const {
    newLocation,
    setNewLocation,
    newLocationIsOpen,
    setNewLocationIsOpen,
  } = useDrawerContext()
  //const Variants = {
  //  container: {
  //    container_open: { width: '28rem' },
  //    container_close: { width: '25rem' },
  //  },
  //}

  //const AnimationProps = {
  //  container: {
  //    initial: 'container_close',
  //    animate: !isOpen && !isMobile ? 'container_open' : 'container_close',
  //    variants: { ...Variants.container },
  //    exit: { opacity: 0 },
  //    transition: {
  //      delay: 0,
  //      ease: 'linear',
  //      duration: 0.25,
  //    },
  //  },
  //}
  const handleBackBtnCick = () => {
    setNewLocation(null)
    setNewLocationIsOpen(false)
  }

  return (
    //<DrawerProvider>
    <div
      className={`absolute z-10 h-full w-full border-l-[.5px] border-solid border-[rgba(0,0,0,.2)] bg-white md:static md:w-side-bar ${
        showMobileMap ? '' : 'hidden md:block'
      }`}
    >
      <div className="relative flex h-sideBarContainer flex-col p-6">
        {newLocation && (
          <button
            className="black absolute top-0 left-[-1.5rem] rounded-full bg-white p-1"
            onClick={() => handleBackBtnCick()}
          >
            <CloseArrow />
          </button>
        )}
        <LocationDrawer />
        <ListDrawer />
      </div>
    </div>
    //</DrawerProevider>
  )
}

export default SideBar

{
  /*<MotionDiv
      {...AnimationProps.container}
      classNames={`absolute z-10 h-full w-full border-l-[.5px] border-solid border-[rgba(0,0,0,.2)] bg-white md:static md:w-side-bar ${
        showMobileMap ? '' : 'hidden md:block'
      }`}
      framerKey="sideBar-container"
    >    */
}
