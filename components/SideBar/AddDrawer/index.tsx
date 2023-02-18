import Input from './Input'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useDebounce } from '../../../hooks'
import { trpc } from '../../../utils/trpc'
import { useDrawerContext } from '../DrawerProvider'
import AddButton from './AddButton'
import SearchDrawer from './SearchResults'

const AddDrawer = () => {
  const { inputValue, setInputValue, isOpen, setIsOpen, setData } =
    useDrawerContext()
  const debounce = useDebounce(inputValue, 500)
  const { data, isLoading } = trpc.searchByPlace.useQuery(debounce, {
    refetchOnWindowFocus: false,
  })

  console.log('data: ', data)

  useEffect(() => {
    setData(data)
  }, [data, setData])

  useEffect(() => {
    if (!isOpen) setInputValue('')
  }, [isOpen, setInputValue])

  return (
    <>
      <div className="flex flex-row justify-end gap-3">
        <Input />
        <div className="mb-6 max-w-[250px]">
          <AddButton />
        </div>
      </div>
      {isOpen && data && data.length > 0 && <SearchDrawer />}
    </>
  )
}

export default AddDrawer
