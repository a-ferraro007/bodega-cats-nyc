import { createContext, useContext, useState } from 'react'
import shallow from 'zustand/shallow'
import { useAddressSearchStore } from '../../store'
const DropdownContext = createContext({})

const DropdownProvider = ({ children }: any) => {
  const [searchLocation, setSearchLocation] = useState({})
  const [query, setQuery] = useState('')
  const [searchFocus, setSearchFocus] = useState(false)
  const [data, setData] = useState({})

  //// NOTE: you *might* need to memoize this value
  //// Learn more in http://kcd.im/optimize-context
  //const value = {state, dispatch}
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
      }}
    >
      {children}
    </DropdownContext.Provider>
  )
}

function useDropdown() {
  const context = useContext(DropdownContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}

export { DropdownProvider, useDropdown }
