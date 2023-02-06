import shallow from 'zustand/shallow'
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { useAddressSearchStore } from '../../store'
import { useDebounce } from '../../hooks'
import { trpc } from '../../utils/trpc'
import { useDropdown } from './DrowpdownProvider'

const AddressSearchBar = ({ address }: any) => {
  const { setQuery, query, setData } = useDropdown()
  const debounce = useDebounce(query, 250)
  const isFocused = useRef(null)
  const [inputValue, setInputValue] = useState<string>(address)
  const { data, isFetching, isLoading, isSuccess } =
    trpc.searchByAddress.useQuery(debounce, {
      enabled: debounce?.length > 0,
    })

  useEffect(() => {
    setData(data)
    if (inputValue === undefined) setInputValue(address)
  }, [address, data, inputValue, setData])

  const HandleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setInputValue(e.target.value)
  }

  const HandleInputEnterEvent = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && data && data.length > 0) {
      //map.flyTo({ center: data[0].Feature.geometry.coordinates })
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
    <div className="flex-grow">
      <input
        className="font-regular h-10 w-full rounded-[10px] border-[rgba(0,0,0,.5)] bg-[#f5f4f1] px-4 font-nunito text-lg text-graphite outline-none transition-all  duration-500 placeholder:text-graphite"
        placeholder="search an area"
        id={'mobile-search-input'}
        ref={isFocused}
        type="search"
        value={inputValue || ''}
        autoFocus={true}
        autoComplete="none"
        onChange={(e) => HandleOnChange(e)}
        onKeyDown={(e) => HandleInputEnterEvent(e)}
        onFocus={() => {
          //setSearchFocus(true)
        }}
        onBlur={() => {
          setInputValue(inputValue || address)
        }}
      />
    </div>
  )
}

export default AddressSearchBar
