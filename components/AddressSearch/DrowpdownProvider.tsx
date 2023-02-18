import { createContext, ReactNode, useContext, useState } from 'react'

type DropdownContextType = {
  query: string
  setQuery: (query: string) => void
  searchLocation: any
  setSearchLocation: (searchLocation: any) => void
  data: any
  setData: (data: any) => void
  openDropdown: boolean
  setOpenDropdown: (openDropdown: boolean) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}
type DropdownProviderProps = {
  children: ReactNode
}

const DropdownContext = createContext<DropdownContextType>({
  query: '',
  setQuery: () => {},
  searchLocation: {},
  setSearchLocation: () => {},
  data: {},
  setData: () => {},
  openDropdown: false,
  setOpenDropdown: () => {},
  isLoading: false,
  setIsLoading: () => {},
})

const DropdownProvider = ({ children }: DropdownProviderProps) => {
  const [searchLocation, setSearchLocation] = useState<any>({})
  const [query, setQuery] = useState('')
  const [data, setData] = useState<any>({})
  const [openDropdown, setOpenDropdown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <DropdownContext.Provider
      value={{
        query,
        setQuery,
        searchLocation,
        setSearchLocation,
        data,
        setData,
        openDropdown,
        setOpenDropdown,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </DropdownContext.Provider>
  )
}

function useDropdownContext(): any {
  const context = useContext(DropdownContext)
  if (context === undefined) {
    throw new Error('useDropdownContext must be used within a DropdownProvider')
  }
  return context
}

export { DropdownProvider, useDropdownContext }
