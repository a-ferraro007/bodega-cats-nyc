import { ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react'
import { useStore } from '../../store'
import { FeatureDrawerState } from '../../constants/types'
import { useDebounce, useSearch } from '../../hooks/Search'
import { newMarker } from '../../utils/MapMarker'

const SearchBar = () => {
  const query = useStore((state) => state.searchQuery)
  const debounce = useDebounce(query, 250)
  const { data, isFetching, isLoading, isSuccess } = useSearch(debounce)
  const map = useStore((state) => state.mapRef)
  const featuresMap = useStore((state) => state.features)
  const setFeatureDrawerState = useStore((state) => state.setFeatureDrawerState)
  const setDrawerState = useStore((state) => state.setDrawerState)
  const { searchDrawerIsActive, featureDrawerIsActive } = useStore((state) => state.drawerState)
  const setSearchMarker = useStore((state) => state.setSearchMarker)
  const searchMarker = useStore((state) => state.searchMarker)
  const setQuery = useStore((state) => state.setSearchQuery)
  const setSearchFocus = useStore((state) => state.setSearchFocus)
  const isFocused = useRef(null)

  const HandleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '' && searchMarker) {
      searchMarker.remove()
    }
    if (e.target.value === '' && searchDrawerIsActive) {
      //setDrawerState({ searchDrawerIsActive: false, featureDrawerIsActive })
    }
    setQuery(e.target.value)
  }

  const HandleInputEnterEvent = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && data && data.length > 0) {
      map.flyTo({ center: data[0].Feature.geometry.coordinates })
    }
  }
  //focus-within:bg-slate-300 active:bg-slate-300
  return (
    <div className="hidden md:block relative group-focus/search mt-4 flex-grow">
      <input
        id={'search-input'}
        ref={isFocused}
        required={true}
        type="search"
        className="w-full h-10 px-4 text-graphite text-sm font-bold font-nunito peer/search bg-[rgba(0,0,0,.1)] active:bg-[rgba(0,0,0,.06)] focus-within:bg-[rgba(0,0,0,.06)] rounded-md outline-none  transition-all duration-500"
        value={query}
        onChange={(e) => HandleOnChange(e)}
        onKeyDown={(e) => HandleInputEnterEvent(e)}
        onFocus={() => {
          setSearchFocus(true)
        }}
        onBlur={() => {
          setSearchFocus(false)
          if (searchDrawerIsActive && query.length === 0) {
            setDrawerState({ searchDrawerIsActive: false, featureDrawerIsActive })
          }
        }}
      />
      <label className="text-lg font-bold font-nunito text-graphite transform transition-all duration-500 absolute top-0 left-0 h-full flex items-center pl-2 group-focus-within/search:text-sm  group-focus-within/search:h-1/2  group-focus-within/search:-translate-y-full  group-focus-within/search:pl-0 peer-focus-within/search:-translate-y-full peer-focus-within/search:h-1/2 peer-focus-within/search:pl-0 peer-focus-within/search:text-sm peer-valid/search:-translate-y-full peer-valid/search:h-1/2 peer-valid/search:pl-0 peer-valid/search:text-sm pointer-events-none">
        find a cat
      </label>
    </div>
  )
}

export default SearchBar
