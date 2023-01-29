import { useEffect, useMemo } from 'react'
import shallow from 'zustand/shallow'
import { useFeatureStore, useStore } from '../../store'
import SearchIcon from '../../svg/SearchIcon'
import BoroughBadge from './BoroughBadge'

const SideBar = () => {
  const showMobileMap = useStore((state) => state.showMobileMap)
  const featureStateMap = useFeatureStore((state) => state.features)
  const featureArray = useMemo(() => {
    const array: Array<any> = []
    featureStateMap.forEach(({ feature }) => {
      array.push(feature)
    })
    return array
  }, [featureStateMap])

  useEffect(() => {
    console.log({ featureArray })

    //featureStateMap.forEach((f) => console.log(f))
    //console.log('LIST', featureStateMap.entries().next().value[1].feature)
  }, [featureArray])
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
      <div className="p-6">
        {featureArray &&
          featureArray.map((feature: any) => {
            console.log(feature)
            const { id, properties } = feature
            const { address, name, locality } = properties

            return (
              <li
                key={id}
                className="my-4 px-4 py-6 cursor-pointer border-[1px] border-[#dad8d2] rounded-[15px] hover:bg-[#f5f4f1] transition-all duration-200 last:mb-0 list-none"
                tabIndex={0}
              >
                <span className="block font-nunito font-bold text-md pb-1">{name}</span>
                <p className="font-roboto font-normal text-xs mb-4  "> {address}</p>
                <div className="border-b-[1px] border-solid border-[#dad8d2]"></div>
                {locality && (
                  <div className="pt-4">
                    <BoroughBadge locality={locality} />
                  </div>
                )}
              </li>
            )
          })}
      </div>
    </div>
  )
}

export default SideBar
