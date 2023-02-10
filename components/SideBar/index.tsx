import { useMemo } from 'react'
import { useFeatureStore, useStore } from '../../store'
import { trpc } from '../../utils/trpc'
import NearbyList from './NearbyList'
import FeaturedList from './FeaturedList'
import LoadingList from './LoadingList'
import shallow from 'zustand/shallow'
import { AnimatePresence, motion } from 'framer-motion'

const SideBar = () => {
  const showMobileMap = useStore((state) => state.showMobileMap)
  const { features: featureMap, isLoading } = useFeatureStore(
    (state) => state,
    shallow
  )
  const { data } = trpc.selectTopInArea.useQuery('queryKeyRef.current', {
    enabled: true,
  })
  const featureArray = useMemo(() => {
    const array: Array<any> = []
    featureMap.forEach(({ feature }) => {
      array.push(feature)
    })
    return array
  }, [featureMap])

  return (
    <div
      className={`absolute z-10 h-full w-full bg-white md:static  md:w-side-bar ${
        showMobileMap ? '' : 'hidden md:block'
      }`}>
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

      <div className="flex flex-col p-6">
        <div className="mb-6 max-w-[250px] self-end">
          <button className="w-full rounded-[10px] bg-dark-blue-radial-gradient p-2 px-4 font-nunito text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.03]">
            new cat
          </button>
        </div>
        <div>
          <p className="mb-3 font-nunito text-lg font-semibold">
            Top in New York
          </p>
          {false ? <FeaturedList data={data} /> : <LoadingList size={10} />}
        </div>
        <div>
          <p className="font-nunito text-lg font-semibold">Nearby</p>
          {isLoading && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1 }}>
                <LoadingList size={10} flexDirection={'flex-col'} />
              </motion.div>
            </AnimatePresence>
          )}
          {!isLoading && featureArray && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1, ease: [0.17, 0.67, 0.83, 0.67] }}>
                <NearbyList nearby={featureArray} />
              </motion.div>
            </AnimatePresence>
          )}
          {!isLoading && data && featureArray.length <= 0 && (
            <span className="block w-full text-center font-nunito font-normal">
              {' '}
              no cats nearby :({' '}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default SideBar
//"lint-staged": {
//  "*.{js,ts,jsx,tsx}": "eslint --cache --fix",
//  "*.{js,ts,jsx,tsx,css,md}": "prettier --write"
//}

{
  /*<AnimatePresence>
<motion.div
	initial={{ opacity: 0 }}
	animate={{ opacity: 1 }}
	exit={{ opacity: 0 }}>
	<LoadingList size={10} flexDirection={'flex-col'} />
</motion.div>
</AnimatePresence>*/
}
