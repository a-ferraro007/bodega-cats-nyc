import { useEffect, useMemo } from 'react'
import shallow from 'zustand/shallow'
import { useFeatureStore, useStore } from '../../store'
import SearchIcon from '../../svg/SearchIcon'
import { trpc } from '../../utils/trpc'
import BoroughBadge from './BoroughBadge'
import NearbyList from './NearbyList'
import FeaturedList from './TopList'

const SideBar = () => {
  const showMobileMap = useStore((state) => state.showMobileMap)
  const featureStateMap = useFeatureStore((state) => state.features)
  const { data, refetch } = trpc.selectTopInArea.useQuery('queryKeyRef.current', { enabled: true })
  const featureArray = useMemo(() => {
    const array: Array<any> = []
    featureStateMap.forEach(({ feature }) => {
      array.push(feature)
    })
    return array
  }, [featureStateMap])

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

      {/*<div className="flex flex-row gap-3 mx-6 border-b border-b-[#dad8d2]">
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
      </div>*/}

      <div className="p-6">
        {data && <FeaturedList data={data} />}
        <div className="mt-6">
          <NearbyList nearby={featureArray} />
        </div>
      </div>
    </div>
  )
}

export default SideBar
