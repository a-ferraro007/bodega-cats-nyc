import { createContext, useContext, useState } from 'react'
import shallow from 'zustand/shallow'
import { useAddressSearchStore } from '../../store'
const DropdownContext = createContext({})

const DropdownProvider = ({ children }: any) => {
  const [searchLocation, setSearchLocation] = useState<any>({})
  const [query, setQuery] = useState('')
  const [searchFocus, setSearchFocus] = useState(false)
  const [data, setData] = useState<any>({})
  const [openDropdown, setOpenDropdown] = useState(false)
  const [inputFocus, setInputFocus] = useState(false)
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
        searchFocus,
        setSearchFocus,
        openDropdown,
        setOpenDropdown,
        inputFocus,
        setInputFocus,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </DropdownContext.Provider>
  )
}

function useDropdown(): any {
  const context = useContext(DropdownContext)
  if (context === undefined) {
    throw new Error('useDropdown must be used within a CountProvider')
  }
  return context
}

export { DropdownProvider, useDropdown }
