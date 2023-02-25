import { useStore } from '../../store'
import { AnimatePresence } from 'framer-motion'
import NewLocationDrawer from './NewLocationDrawer'
import { DrawerProvider, useDrawerContext } from './DrawerProvider'
import ListDrawer from './ListDrawer'

const SideBar = () => {
  const showMobileMap = useStore((state) => state.showMobileMap)

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

  return (
    <DrawerProvider>
      <div
        className={`absolute z-10 h-full w-full border-l-[.5px] border-solid border-[rgba(0,0,0,.2)] bg-white md:static md:w-side-bar ${
          showMobileMap ? '' : 'hidden md:block'
        }`}
      >
        <div className=" flex h-sideBarContainer flex-col p-6">
          <NewLocationDrawer />
          <ListDrawer />
        </div>
      </div>
    </DrawerProvider>
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
