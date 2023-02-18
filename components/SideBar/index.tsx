import { useStore } from '../../store'
import { AnimatePresence } from 'framer-motion'
import AddDrawer from './AddDrawer'
import { DrawerProvider } from './DrawerProvider'
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
      <AnimatePresence>
        <div
          className={`absolute z-10 h-full w-full border-l-[.5px] border-solid border-[rgba(0,0,0,.2)] bg-white md:static md:w-side-bar ${
            showMobileMap ? '' : 'hidden md:block'
          }`}
        >
          <div className="flex h-sideBarContainer flex-col p-6">
            <AddDrawer />
            <ListDrawer />
          </div>
        </div>
      </AnimatePresence>
    </DrawerProvider>
  )
}

export default SideBar

{
  /*<button
className="w-full rounded-[10px] bg-dark-blue-radial-gradient p-2 px-4 font-nunito text-lg font-semibold text-white transition-colors duration-300 hover:scale-[1.03]"
onClick={() => handleNewCatCTA()}
>
new cat
</button>*/
}

{
  /*<MotionDiv
      {...AnimationProps.container}
      classNames={`absolute z-10 h-full w-full border-l-[.5px] border-solid border-[rgba(0,0,0,.2)] bg-white md:static md:w-side-bar ${
        showMobileMap ? '' : 'hidden md:block'
      }`}
      framerKey="sideBar-container"
    >    */
}
