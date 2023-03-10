import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  FeatureDrawerState,
  NewLocation,
  NewLocationInterface,
} from '../../constants/types'
import { useDebounce } from '../../hooks'
import { trpc } from '../../utils/trpc'
const { search } = trpc
type DrawerContextType = {
  data: NewLocation[]
  setData: Dispatch<SetStateAction<NewLocation[]>>
  newLocation: NewLocationInterface | null
  setNewLocation: Dispatch<SetStateAction<any>>
  newLocOpen: boolean
  setNewLocOpen: Dispatch<SetStateAction<boolean>> //(newLocationIsOpen: boolean) => void
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>> //(isOpen: boolean) => void
  inputValue: string
  setInputValue: Dispatch<SetStateAction<string>> //(inputValue: string) => void
  inputFocused: boolean
  setInputFocused: Dispatch<SetStateAction<boolean>> //(isInputFocused: boolean) => void
}
type DrawerProviderProps = {
  children: ReactNode
}

const DrawerContext = createContext<DrawerContextType>({
  data: [],
  setData: () => {},
  newLocation: null,
  setNewLocation: () => {},
  newLocOpen: false,
  setNewLocOpen: () => {},
  isOpen: true,
  setIsOpen: () => {},
  inputValue: '',
  setInputValue: () => {},
  inputFocused: false,
  setInputFocused: () => {},
})

const DrawerProvider = ({ children }: DrawerProviderProps) => {
  const [data, setData] = useState<NewLocation[]>([])
  const [newLocation, setNewLocation] = useState(null)
  const [newLocOpen, setNewLocOpen] = useReducer((state) => !state, false)
  const [isOpen, setIsOpen] = useReducer((state) => !state, false)
  const [inputFocused, setInputFocused] = useReducer((state) => !state, false)
  const [inputValue, setInputValue] = useState('')
  const { debounce } = useDebounce(inputValue, 500)
  const { data: searchData, isLoading } = search.searchByPlace.useQuery(
    debounce,
    {
      refetchOnWindowFocus: false,
    }
  )

  useEffect(() => {
    if (!searchData) return
    setData(searchData)
  }, [searchData, setData])

  useEffect(() => {
    if (!isOpen) setInputValue('')
  }, [isOpen, setInputValue])

  return (
    <DrawerContext.Provider
      value={{
        data,
        newLocation,
        newLocOpen,
        isOpen,
        inputValue,
        inputFocused,
        setData,
        setIsOpen,
        setInputFocused,
        setInputValue,
        setNewLocOpen,
        setNewLocation,
      }}
    >
      {children}
    </DrawerContext.Provider>
  )
}

function useDrawerContext(): DrawerContextType {
  const context = useContext(DrawerContext)
  if (context === undefined) {
    throw new Error('useDrawerContext must be used within a DrawerProvider')
  }
  return context
}

export { DrawerProvider, useDrawerContext }
