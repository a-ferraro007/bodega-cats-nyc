import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { useStore } from '../../../../store'
import { useDebounce, useSearch } from '../../../../hooks/SearchByPlace'
import { newMarker } from '../../../../utils/MapMarker'
import { FeatureDrawerState } from '../../../../constants/types'
import BoroughBadge from './BoroughBadge'

const SearchDrawer = () => {
  const query = useStore((state) => state.searchQuery)
  const debounce = useDebounce(query, 250)
  const { data, isFetching, isLoading, isSuccess, isFetched } = useSearch(debounce)
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
    setDrawerState({ featureDrawerIsActive: false, searchDrawerIsActive: false })

    if (searchMarker) searchMarker.remove()
    if (featuresMap.has(Feature.id)) {
      console.log('FEATURE MAP:', featuresMap.get(Feature.id))
      map.flyTo({ zoom: 18, center: Feature.geometry.coordinates })
      return
    }

    const marker = newMarker(Feature, false)
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
    <div className="overflow-scroll h-container bg-white">
      <ul className="px-4 pb-4">
        {isFetched && query && data?.length === 0 && (
          <span className="block w-full font-nunito font-bold text-sm text-center">
            no cats found
          </span>
        )}

        {isFetched && data ? (
          data?.map((feature: FeatureDrawerState) => {
            const { ParsedFeature } = feature
            return (
              <li
                key={ParsedFeature?.feature_id}
                className="my-4 px-4 py-6 cursor-pointer border-[1px] border-[#dad8d2] rounded-[15px] hover:bg-[#f5f4f1] transition-all duration-200 last:mb-0"
                onClick={() => HandleOnClick(feature)}
                onKeyDown={(e) => HandleOnKeyDown(e, feature)}
                tabIndex={0}
              >
                <span className="block font-nunito font-bold text-md pb-1">
                  {ParsedFeature?.name}
                </span>
                <p className="font-roboto font-normal text-xs mb-4  "> {ParsedFeature?.address}</p>

                {ParsedFeature?.locality && (
                  <div className="pt-4 border-t-[1px] border-solid border-[#dad8d2]">
                    <BoroughBadge locality={ParsedFeature?.locality} />
                  </div>
                )}
              </li>
            )
          })
        ) : (
          <span className="block w-full font-nunito font-bold text-sm text-center">
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
