import { useStore } from '../../store'
import { AnimatePresence, motion } from 'framer-motion'
import LocationDrawer from './LocationDrawer'
import { DrawerProvider, useDrawerContext } from './DrawerProvider'
import ListDrawer from './ListDrawer'
import CloseArrow from '../../svg/CloseArrow'
import SearchDrawer from './SearchDrawer'
import { useIsMobile } from '../../hooks'

const SideBar = () => {
  const isMobile = useIsMobile() // move to a store & call once
  const showMobileMap = useStore((state) => state.showMobileMap)
  const { isOpen, newLocation, setNewLocation, newLocOpen, setNewLocOpen } =
    useDrawerContext()

  const Variants = {
    list_drawer: {
      list_drawer_open: { opacity: 1 },
      list_drawer_close: { opacity: 0 },
    },
  }

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

  return (
    <AnimatePresence>
      <div
        className={`absolute z-10 h-full w-full border-l-[.5px] border-solid border-[rgba(0,0,0,.2)] bg-white md:static md:w-side-bar ${
          showMobileMap ? '' : 'hidden md:block'
        } ${isMobile && newLocOpen ? '' : ''}`}
      >
        <div
          className={`${
            !newLocation ? 'px-6' : 'bg-slate-100'
          } relative flex h-sideBarContainer flex-col pb-6`}
        >
          <SearchDrawer />
          <LocationDrawer />
          <ListDrawer />
        </div>
      </div>
    </AnimatePresence>
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
