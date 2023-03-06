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
import { useDropdownContext } from './DrowpdownProvider'
import InputLocation from '../../svg/InputLocation'
import Close from '../../svg/Close'

const AddressSearchBar = ({ address }: any) => {
  const { setQuery, query, setData, setOpenDropdown, setIsLoading } =
    useDropdownContext()
  const { debounce } = useDebounce(query, 500)
  const [isInputFocused, setisInputFocused] = useState(false)
  const [inputValue, setInputValue] = useState<string>(address)
  const { data, isLoading } = trpc.searchByAddress.useQuery(debounce, {
    refetchOnWindowFocus: false,
  })
  useLoadingDebounce(isLoading, setIsLoading, 300)

  useEffect(() => {
    if (isInputFocused && query) {
      setOpenDropdown(true)
    } else {
      setOpenDropdown(false)
    }
  }, [isInputFocused, query, setOpenDropdown])

  useMemo(() => {
    setInputValue(address)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  useEffect(() => {
    setData(data)
  }, [data, setData])

  const handleOnFocus = () => setisInputFocused(true)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setInputValue(e.target.value)
  }

  const handleOnBlur = () => {
    setisInputFocused(false)
    setInputValue(inputValue || address)
  }

  return (
    <div
      className="font-regular flex h-10 w-full flex-row gap-1 rounded-[10px] border-[rgba(0,0,0,.5)] bg-[#f5f4f1] px-2 font-nunito text-lg text-graphite outline-none transition-all duration-500  placeholder:text-graphite md:gap-3 md:px-4"
      onBlur={() => handleOnBlur()}
      onFocus={() => handleOnFocus()}
    >
      <span className="mb-1 self-center">
        <InputLocation />
      </span>
      <div className="flex-grow">
        <input
          className="font-regular h-full w-full bg-[#f5f4f1] font-nunito text-lg text-graphite outline-none transition-all  duration-500 placeholder:pl-1 placeholder:text-[rgb(93,93,93)]"
          placeholder="search an area"
          id="search-area-input"
          type="search"
          value={inputValue || ''}
          autoComplete="none"
          onChange={(e) => handleOnChange(e)}
          onFocus={() => handleOnFocus()}
          tabIndex={0}
        />
      </div>
      <button
        className="p-[2px] outline-none md:p-1"
        onClick={() => {
          document.getElementById('search-area-input')?.focus()
          setInputValue('')
          setQuery('')
        }}
      >
        <Close />
      </button>
    </div>
  )
}

export default AddressSearchBar
