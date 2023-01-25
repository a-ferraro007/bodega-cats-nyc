import { useEffect } from 'react'
import { ParsedAddressFeature } from '../../../constants/types'
import { useAddressSearch } from '../../../hooks/index '
import { useStore } from '../../../store'

const Dropdown = ({ data }: any) => {
  const query = useStore((state) => state.searchQuery)
  //const debounce = useDebounce(query, 250)
  //const { data, isFetching, isLoading, isSuccess, isFetched } = useAddressSearch(debounce)
  const map = useStore((state) => state.mapRef)
  const featuresMap = useStore((state) => state.features)
  const setFeatureDrawerState = useStore((state) => state.setFeatureDrawerState)
  const setDrawerState = useStore((state) => state.setDrawerState)
  const drawerState = useStore((state) => state.drawerState)
  const setSearchMarker = useStore((state) => state.setSearchMarker)
  const searchMarker = useStore((state) => state.searchMarker)
  const setQuery = useStore((state) => state.setSearchQuery)

  const HandleOnClick = (selected: ParsedAddressFeature) => {
    console.log({ selected })
    //const { Feature } = selected
    //setFeatureDrawerState(selected)
    //setDrawerState({ featureDrawerIsActive: false, searchDrawerIsActive: false })

    //if (searchMarker) searchMarker.remove()
    //if (featuresMap.has(Feature.id)) {
    //  console.log('FEATURE MAP:', featuresMap.get(Feature.id))
    //  map.flyTo({ zoom: 18, center: Feature.geometry.coordinates })
    //  return
    //}

    //const marker = newMarker(Feature, false)
    //marker.addTo(map)
    //setSearchMarker(marker)
    //map.flyTo({ zoom: 18, center: Feature.geometry.coordinates })
  }

  const HandleOnKeyDown = (e: KeyboardEvent, selected: ParsedAddressFeature) => {
    if (e.key === 'Enter') {
      HandleOnClick(selected)
    }
  }

  return (
    <>
      {data?.length > 0 && (
        <div className="absolute z-20 w-[98%] mx-auto top-12 bg-white rounded-[10px] left-0 right-0 shadow-5xl min-h-[200px] ">
          <ul className="my-3 px-4 max-h-[250px]  h-full overflow-scroll">
            {data?.map((feature: ParsedAddressFeature) => {
              console.log(feature)
              const { name, feature_id } = feature
              return (
                <li
                  className="p-3 hover:bg-[#f5f4f1] rounded-[10px] font-nunito font-medium cursor-pointer"
                  key={feature_id}
                  tabIndex={1}
                >
                  {name}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}

export default Dropdown
