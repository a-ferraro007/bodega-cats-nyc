import SearchInput from './SearchInput'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useDebounce } from '../../../hooks'
import { trpc } from '../../../utils/trpc'
import { useDrawerContext } from '../DrawerProvider'
import AddButton from './AddButton'
import SearchDrawer from './SearchResults'
import NewLocation from './NewLocation'

const NewLocationDrawer = () => {
  const {
    inputValue,
    setInputValue,
    isOpen,
    setIsOpen,
    setData,
    newLocation,
    newLocationIsOpen,
  } = useDrawerContext()
  const debounce = useDebounce(inputValue, 500)
  const { data, isLoading } = trpc.searchByPlace.useQuery(debounce, {
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    setData(data)
  }, [data, setData])

  useEffect(() => {
    if (!isOpen) setInputValue('')
  }, [isOpen, setInputValue])

  useEffect(() => {
    console.log('new location: ', newLocation)
  }, [newLocation])

  return (
    <>
      <div className="flex flex-row justify-end gap-3">
        <SearchInput />
        <div className="mb-4 max-w-[250px]">
          <AddButton />
        </div>
      </div>
      {!newLocationIsOpen && data && data.length > 0 && <SearchDrawer />}
      {newLocation && newLocationIsOpen && <NewLocation />}
    </>
  )
}

export default NewLocationDrawer
