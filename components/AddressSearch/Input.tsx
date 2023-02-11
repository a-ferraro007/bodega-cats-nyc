import shallow from 'zustand/shallow'
import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useAddressSearchStore } from '../../store'
import { useDebounce, useLoadingDebounce } from '../../hooks'
import { trpc } from '../../utils/trpc'
import { useDropdown } from './DrowpdownProvider'

const AddressSearchBar = ({ address }: any) => {
  const {
    setQuery,
    query,
    setData,
    setOpenDropdown,
    openDropdown,
    setInputFocus,
    inputFocus,
    //isLoading: contextIsLoading,
    setIsLoading,
  } = useDropdown()
  const debounce = useDebounce(query, 500)
  const [inputValue, setInputValue] = useState<string>(address)
  const { data, isSuccess, isLoading, isFetching } =
    trpc.searchByAddress.useQuery(debounce, {
      enabled: debounce?.length > 0,
      refetchOnWindowFocus: false,
    })
  useLoadingDebounce(isLoading, setIsLoading, 300)
  console.log(isLoading, isFetching, isSuccess, 'isLoading')

  useEffect(() => {
    if (isLoading) {
      setOpenDropdown(inputFocus)
    }
  }, [inputFocus, isLoading, setOpenDropdown])

  useMemo(() => {
    setInputValue(address)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  useEffect(() => {
    setData(data)
  }, [data, setData])

  const handleOnFocus = () => setInputFocus(true)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setInputValue(e.target.value)
  }

  const handleOnBlur = () => {
    setInputFocus(false)
    setInputValue(inputValue || address)
  }

  return (
    <div className="flex-grow">
      <input
        className="font-regular h-10 w-full rounded-[10px] border-[rgba(0,0,0,.5)] bg-[#f5f4f1] px-4 font-nunito text-lg text-graphite outline-none transition-all  duration-500 placeholder:text-graphite"
        placeholder="search an area"
        id={'mobile-search-input'}
        type="search"
        value={inputValue || ''}
        autoFocus={true}
        autoComplete="none"
        onChange={(e) => handleOnChange(e)}
        onFocus={() => handleOnFocus()}
        onBlur={() => handleOnBlur()}
        tabIndex={0}
      />
    </div>
  )
}

export default AddressSearchBar
