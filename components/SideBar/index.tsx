import { useEffect } from 'react'
import shallow from 'zustand/shallow'
import { useStore } from '../../store'
import SearchIcon from '../../svg/SearchIcon'

const SideBar = () => {
  const showMobileMap = useStore((state) => state.showMobileMap)
  const featureStateMap = useStore((state) => state.features)

  useEffect(() => {
    //console.log('LIST', featureStateMap.entries().next().value[1].feature)
  })
  return (
    <div
      className={`absolute md:static w-full h-full md:w-side-bar bg-white  z-10 ${
        showMobileMap ? '' : 'hidden md:block'
      }`}
    >
      {/*
      border-l-[1px] border-b-[.5px] border-[rgba(0,0,0,.2)]
      border-b-[rgba(0,0,0,.5)] border border-solid */}
      {/*dad8d2  [rgba(0,0,0,.4)]*/}
      <div className="flex flex-row gap-3 mx-6 border-b border-b-[#dad8d2]">
        <div className="self-center">
          <SearchIcon color={'#6e6e6e'} width={20} height={20} />
        </div>
        <div className="flex-grow h-12">
          <input
            className="bg-transparent w-full h-12 text-[#6e6e6e] text-lg font-light font-nunito outline-none transition-all duration-500 placeholder:text-[#6e6e6e]"
            placeholder="search an area"
            id={'mobile-search-input'}
            //ref={isFocused}
            required={true}
            type="search"
            //value={query}
            //onChange={(e) => HandleOnChange(e)}
            //onKeyDown={(e) => HandleInputEnterEvent(e)}
            onFocus={() => {
              //setSearchFocus(true)
            }}
            onBlur={() => {}}
            autoFocus={true}
            autoComplete="none"
          />
        </div>
        <div className=""></div>
      </div>
      <div className="p-6">{featureStateMap?.size}</div>
    </div>
  )
}

export default SideBar
