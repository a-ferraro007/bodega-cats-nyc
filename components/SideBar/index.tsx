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
  const { newLocOpen } = useDrawerContext()

  return (
    <div
      className={`absolute z-10 h-full w-full border-l-[.5px] border-solid border-[rgba(0,0,0,.2)] bg-white md:static md:w-side-bar ${
        showMobileMap && 'invisible opacity-0 md:visible md:opacity-[1]'
      }`}
    >
      <div className={`relative flex h-sideBarContainer flex-col px-6`}>
        <SearchDrawer />
        <LocationDrawer />
        <ListDrawer />
      </div>
    </div>
  )
}

export default SideBar
