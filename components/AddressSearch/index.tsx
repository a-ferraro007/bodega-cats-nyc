import { DropdownProvider } from './DrowpdownProvider'
import AddressSearchBar from './Input'
import Dropdown from './Dropdown'
import { useAddressSearchStore } from '../../store'
import shallow from 'zustand/shallow'

const AddressSearch = () => {
  const { address } = useAddressSearchStore((state) => {
    console.log(state.searchLocationState)

    return state.searchLocationState
  }, shallow)

  return (
    <div className="relative flex-grow">
      <DropdownProvider>
        <AddressSearchBar address={address} />
        <Dropdown />
      </DropdownProvider>
    </div>
  )
}

export default AddressSearch
