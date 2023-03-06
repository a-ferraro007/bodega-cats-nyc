import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { useStore } from '../../../../store'
import { useDebounce, useSearch } from '../../../../hooks/SearchByPlace'
import { returnNewMarker } from '../../../../utils/MapMarker'
import { FeatureDrawerState } from '../../../../constants/types'
import BoroughBadge from './BoroughBadge'

const SearchDrawer = () => {
  const query = useStore((state) => state.searchQuery)
  const { debounce } = useDebounce(query, 250)
  const { data, isFetching, isLoading, isSuccess, isFetched } =
    useSearch(debounce)
  const map = useStore((state) => state.mapRef)
  const featuresMap = useStore((state) => state.features)
  const setFeatureDrawerState = useStore((state) => state.setFeatureDrawerState)
  const setDrawerState = useStore((state) => state.setDrawerState)
  const drawerState = useStore((state) => state.drawerState)
  const setSearchMarker = useStore((state) => state.setSearchMarker)
  const searchMarker = useStore((state) => state.searchMarker)
  const setQuery = useStore((state) => state.setSearchQuery)

  const HandleOnClick = (selected: FeatureDrawerState) => {
    const { Feature } = selected
    setFeatureDrawerState(selected)
    setDrawerState({
      featureDrawerIsActive: false,
      searchDrawerIsActive: false,
    })

    if (searchMarker) searchMarker.remove()
    if (featuresMap.has(Feature.id)) {
      //console.log('FEATURE MAP:', featuresMap.get(Feature.id))
      map.flyTo({ zoom: 18, center: Feature.geometry.coordinates })
      return
    }

    const marker = returnNewMarker(Feature, false)
    marker.addTo(map)
    setSearchMarker(marker)
    map.flyTo({ zoom: 18, center: Feature.geometry.coordinates })
  }

  const HandleOnKeyDown = (e: KeyboardEvent, selected: FeatureDrawerState) => {
    if (e.key === 'Enter') {
      HandleOnClick(selected)
    }
  }

  return (
    <div className="h-container overflow-scroll bg-white">
      <ul className="px-4 pb-4">
        {isFetched && query && data?.length === 0 && (
          <span className="block w-full text-center font-nunito text-sm font-bold">
            no cats found
          </span>
        )}

        {isFetched && data ? (
          data?.map((feature: FeatureDrawerState) => {
            const { ParsedFeature } = feature
            return (
              <li
                key={ParsedFeature?.feature_id}
                className="my-4 cursor-pointer rounded-[15px] border-[1px] border-[#dad8d2] px-4 py-6 transition-all duration-200 last:mb-0 hover:bg-[#f5f4f1]"
                onClick={() => HandleOnClick(feature)}
                onKeyDown={(e) => HandleOnKeyDown(e, feature)}
                tabIndex={0}
              >
                <span className="text-md block pb-1 font-nunito font-bold">
                  {ParsedFeature?.name}
                </span>
                <p className="mb-4 font-roboto text-xs font-normal  ">
                  {' '}
                  {ParsedFeature?.address}
                </p>

                {ParsedFeature?.locality && (
                  <div className="border-t-[1px] border-solid border-[#dad8d2] pt-4">
                    <BoroughBadge locality={ParsedFeature?.locality} />
                  </div>
                )}
              </li>
            )
          })
        ) : (
          <span className="block w-full text-center font-nunito text-sm font-bold">
            search for a cat
          </span>
        )}
      </ul>
    </div>
  )
}

export default SearchDrawer
{
  /*<li
key={ParsedFeature?.feature_id}
className="my-2 p-4 cursor-pointer border-b-[1px] border-b-gray-300 transition-all duration-200 hover:border-b-gray-100 hover:bg-slate-200 hover:rounded-md last:border-b-0"
onClick={() => HandleOnClick(feature)}
onKeyDown={(e) => HandleOnKeyDown(e, feature)}
tabIndex={0}
>
<span className="block font-nunito font-bold text-sm">{ParsedFeature?.name}</span>
<span className="font-roboto font-normal text-xs"> {ParsedFeature?.address}</span>

{ParsedFeature?.locality && <BoroughBadge locality={ParsedFeature?.locality} />}
</li>*/
}
