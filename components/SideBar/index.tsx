import { useStore } from '../../store'
import LocationDrawer from './LocationDrawer'
import ListDrawer from './ListDrawer'
import SearchDrawer from './SearchDrawer'

const SideBar = () => {
  const showMobileMap = useStore((state) => state.showMobileMap)

  return (
    <div
      className={`absolute z-10 h-full w-full border-l-[.5px] border-solid border-[rgba(0,0,0,.08)] bg-seasalt  md:relative md:w-side-bar ${
        !showMobileMap ? 'invisible  opacity-0 md:visible md:opacity-[1]' : ''
      }`}
    >
      <div className="relative flex h-mobileSideContainer flex-col px-4 md:h-desktopSideContainer">
        <SearchDrawer />
        <LocationDrawer />
        <ListDrawer />
      </div>
    </div>
  )
}

export default SideBar
