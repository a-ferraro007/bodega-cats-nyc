import { ChangeEvent, KeyboardEvent, useRef } from 'react'
import { useAddressSearchStore, useStore } from '../store'
import { useDebounce, useSearch } from '../hooks'

const SearchBar = () => {
  const {
    searchQuery: query,
    setSearchQuery: setQuery,
    setSearchFocus,
    searchMarker,
  } = useAddressSearchStore((state) => state)
  const debounce = useDebounce(query, 250)
  const { data, isFetching, isLoading, isSuccess } = useSearch(debounce)
  const map = useStore((state) => state.mapRef)
  const isFocused = useRef(null)

  const HandleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '' && searchMarker) {
      searchMarker.remove()
    }
    //if (e.target.value === '' && searchDrawerIsActive) {
    //setDrawerState({ searchDrawerIsActive: false, featureDrawerIsActive })
    //}
    setQuery(e.target.value)
  }

  const HandleInputEnterEvent = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && data && data.length > 0) {
      map.flyTo({ center: data[0].Feature.geometry.coordinates })
    }
  }

  const variants = {
    container: {
      active: { top: 0, height: '100%' },
      close: { bottom: '2.5rem', height: '0px' },
    },
    input: {
      active: { width: '100%' },
      close: { width: '75%' },
    },
  }

  return (
    <>
      <div className="flex-grow">
        <input
          className="text-md h-10 w-full rounded-[10px] border-[rgba(0,0,0,.5)] bg-[#f5f4f1] px-4 font-nunito font-bold text-graphite outline-none transition-all  duration-500 placeholder:text-graphite"
          placeholder="enter an address"
          id={'mobile-search-input'}
          ref={isFocused}
          required={true}
          type="search"
          value={query}
          onChange={(e) => HandleOnChange(e)}
          onKeyDown={(e) => HandleInputEnterEvent(e)}
          onFocus={() => {
            setSearchFocus(true)
          }}
          onBlur={() => {}}
          autoFocus={true}
          autoComplete="none"
        />
      </div>
    </>
  )
}

export default SearchBar
