import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '../../store'
import Drawer from '../Drawer'
import SearchDrawer from '../Drawer/SearchDrawer'
import SearchBar from '../SearchBar'
import Mobile from './Mobile'

const Layout = ({ children }: any) => {
  const { searchDrawerIsActive, featureDrawerIsActive } = useStore((state) => state.drawerState)
  const searchFocus = useStore((state) => state.searchFocus)
  return (
    <>
      <div className="hidden md:block h-3/4 max-h-[900px] bg-ice mt-3 mx-3 md:mt-6 md:mx-8 rounded-[25px] p-5 md:pt-5 md:p-7">
        <Mobile>{children}</Mobile>
      </div>
      <div className="relative w-full h-full md:hidden">
        {children}

        <div className="absolute z-100 top-0 right-0 left-0">
          <SearchBar />
          <AnimatePresence>
            {((searchDrawerIsActive && searchFocus) || searchFocus) && (
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
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}

export default Layout
