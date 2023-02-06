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
import { useDebounce } from '../../hooks'
import { trpc } from '../../utils/trpc'
import { useDropdown } from './DrowpdownProvider'

const AddressSearchBar = ({ address }: any) => {
  const { setQuery, query, setData, setOpenDropdown } = useDropdown()
  const debounce = useDebounce(query, 200)
  const [inputValue, setInputValue] = useState<string>(address)
  const { data, isFetching, isLoading, isSuccess } =
    trpc.searchByAddress.useQuery(debounce, {
      enabled: debounce?.length > 0,
      onSuccess: () => setOpenDropdown(true),
    })

  useMemo(() => {
    if (inputValue !== address) setInputValue(address)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  useEffect(() => {
    setData(data)
  }, [data, setData])

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
        type="search"
        value={inputValue || ''}
        autoFocus={true}
        autoComplete="none"
        onChange={(e) => HandleOnChange(e)}
        onKeyDown={(e) => HandleInputEnterEvent(e)}
        onBlur={() => {
          setInputValue(inputValue || address)
        }}
        tabIndex={0}
      />
    </div>
  )
}

export default AddressSearchBar
