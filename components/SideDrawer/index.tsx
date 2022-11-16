import { ChangeEvent, useEffect, useState } from 'react'
import { useDebounce, useSearch } from '../../hooks/Search'

const SideDrawer = () => {
  const [query, setQuery] = useState('')
  const debounce = useDebounce(query, 250)
  const { data } = useSearch(debounce)

  const HandleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className="w-[525px] rounded-r-none rounded-br-none rounded-lg bg-white p-4">
      <div className="w-full relative group-focus/search mt-4">
        <input
          id={'search-input'}
          required={true}
          type="search"
          className="w-full h-10 px-4 text-sm font-bold font-baloo peer/search bg-gray-100 rounded-md outline-none"
          value={query}
          onChange={(e) => HandleOnChange(e)}
        />
        <label className="text-lg font-bold font-baloo transform transition-all duration-500 absolute top-0 left-0 h-full flex items-center pl-2 group-focus-within/search:text-sm  group-focus-within/search:h-1/2  group-focus-within/search:-translate-y-full  group-focus-within/search:pl-0 peer-focus-within/search:-translate-y-full peer-focus-within/search:h-1/2 peer-focus-within/search:pl-0 peer-focus-within/search:text-sm peer-valid/search:-translate-y-full peer-valid/search:h-1/2 peer-valid/search:pl-0 peer-valid/search:text-sm pointer-events-none">
          search
        </label>
      </div>
    </div>
  )
}

export default SideDrawer
