import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { NewLocationInterface } from '../../constants/types'
type DrawerContextType = {
  data: any
  setData: Dispatch<SetStateAction<any>> //(data: any) => void
  newLocation: NewLocationInterface | null
  setNewLocation: Dispatch<SetStateAction<any>>
  newLocationIsOpen: boolean
  setNewLocationIsOpen: Dispatch<SetStateAction<boolean>> //(newLocationIsOpen: boolean) => void
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>> //(isOpen: boolean) => void
  inputValue: string
  setInputValue: Dispatch<SetStateAction<string>> //(inputValue: string) => void
  isInputFocused: boolean
  setisInputFocused: Dispatch<SetStateAction<boolean>> //(isInputFocused: boolean) => void
}
type DrawerProviderProps = {
  children: ReactNode
}

const DrawerContext = createContext<DrawerContextType>({
  data: null,
  setData: () => {},
  newLocation: null,
  setNewLocation: () => {},
  newLocationIsOpen: false,
  setNewLocationIsOpen: () => {},
  isOpen: true,
  setIsOpen: () => {},
  inputValue: '',
  setInputValue: () => {},
  isInputFocused: false,
  setisInputFocused: () => {},
})

const DrawerProvider = ({ children }: DrawerProviderProps) => {
  const [data, setData] = useState(null)
  const [newLocation, setNewLocation] = useState(null)
  const [newLocationIsOpen, setNewLocationIsOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isInputFocused, setisInputFocused] = useState(false)
  const [inputValue, setInputValue] = useState('')

  return (
    <DrawerContext.Provider
      value={{
        data,
        setData,
        newLocation,
        setNewLocation,
        newLocationIsOpen,
        setNewLocationIsOpen,
        isOpen,
        setIsOpen,
        inputValue,
        setInputValue,
        isInputFocused,
        setisInputFocused,
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
