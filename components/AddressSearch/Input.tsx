import { ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react'
import { useAddressSearchStore, useFeatureStore, useStore } from '../../store'
import { useAddressSearch, useDebounce } from '../../hooks'
import { trpc } from '../../utils/trpc'

const AddressSearchBar = ({ setData }: any) => {
  const {
    searchQuery: query,
    searchFocus,
    searchMarker,
    setSearchFocus,
    setSearchQuery: setQuery
  } = useAddressSearchStore((state) => state)
  const debounce = useDebounce(query, 250)
  const map = useStore((state) => state.mapRef)
  const featuresMap = useFeatureStore((state) => state.features)

  const isFocused = useRef(null)
  const { data, isFetching, isLoading, isSuccess } = trpc.searchByAddress.useQuery(debounce, {
    enabled: debounce.length > 0
  })

  useEffect(() => {
    //console.log({ address: data })
    setData(data)
  }, [data, setData])

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
      //map.flyTo({ center: data[0].Feature.geometry.coordinates })
    }
  }

  const variants = {
    container: {
      active: { top: 0, height: '100%' },
      close: { bottom: '2.5rem', height: '0px' }
    },
    input: {
      active: { width: '100%' },
      close: { width: '75%' }
    }
  }

  return (
    <div className="flex-grow">
      <input
        className="bg-[#f5f4f1] w-full h-10 px-4 text-graphite text-lg font-regular font-nunito rounded-[10px] outline-none transition-all duration-500  border-[rgba(0,0,0,.5)] placeholder:text-graphite"
        placeholder="search an area"
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
  )
}

export default AddressSearchBar
