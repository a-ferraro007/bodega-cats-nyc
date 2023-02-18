import Input from './Input'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useDebounce } from '../../../hooks'
import { trpc } from '../../../utils/trpc'
import { DrawerProvider, useDrawerContext } from '../DrawerProvider'
import AddButton from './AddButton'

const AddDrawer = () => {
  const { inputValue, isOpen, setIsOpen } = useDrawerContext()
  const debounce = useDebounce(inputValue, 500)
  const { data, isLoading } = trpc.searchByPlace.useQuery(debounce, {
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className="flex flex-row justify-end gap-3">
      <Input />
      <div className="mb-6 max-w-[250px]">
        <AddButton />
      </div>
    </div>
  )
}

export default AddDrawer
