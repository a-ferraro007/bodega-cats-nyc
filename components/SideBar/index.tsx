import { useStore } from '../../store'
import LocationDrawer from './LocationDrawer'
import ListDrawer from './ListDrawer'
import SearchDrawer from './SearchDrawer'
import { useIsMobile } from '../../hooks'

const SideBar = () => {
  const isMobile = useIsMobile()
  const showMobileMap = useStore((state) => state.showMobileMap)

  return (
    <div
      className={`absolute h-full w-full border-r-[.5px] border-solid border-[rgba(0,0,0,.08)] bg-seasalt  md:relative md:w-side-bar ${
        !showMobileMap && isMobile
          ? 'invisible z-[-1] opacity-0 md:visible md:opacity-[1]'
          : 'z-10'
      }`}
    >
      <div className="relative flex h-mobileSideContainer flex-col px-4 pt-4 md:h-desktopSideContainer">
        <SearchDrawer />
        <LocationDrawer />
        <ListDrawer />
      </div>
    </div>
  )
}

export default SideBar
