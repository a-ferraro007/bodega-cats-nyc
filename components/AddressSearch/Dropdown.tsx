import { KeyboardEvent, useEffect } from 'react'
import { SearchLocation } from '../../constants/types'
import { useAddressSearchStore } from '../../store'
import { useDropdown } from './DrowpdownProvider'

const Dropdown = () => {
  const { data, setOpenDropdown, openDropdown } = useDropdown()
  const setSearchLocationState = useAddressSearchStore(
    (state) => state.setSearchLocationState
  )

  const HandleOnClick = (selected: SearchLocation) => {
    setSearchLocationState({
      feature_id: selected.feature_id,
      address: selected.address,
      lnglat: selected.lnglat,
    })
    setOpenDropdown(false)
  }

  const HandleOnKeyDown = (e: KeyboardEvent, selected: SearchLocation) => {
    if (e.key === 'Enter') {
      HandleOnClick(selected)
    }
  }

  return (
    <>
      {openDropdown && (
        <div className="absolute top-16 left-0 right-0 z-20 mx-auto min-h-[250px] w-[98%] rounded-[10px] bg-white shadow-5xl md:top-12">
          <ul className=" h-full max-h-[250px]  overflow-scroll p-4">
            {data?.map(({ feature_id, address, lnglat }: SearchLocation) => {
              const feature = { feature_id, address, lnglat }
              return (
                <li
                  className="cursor-pointer rounded-[10px] p-3 font-nunito font-medium first:pt-0 last:pb-0 hover:bg-[#f5f4f1] focus:bg-[#f5f4f1]"
                  key={feature_id}
                  onKeyDown={(e) => HandleOnKeyDown(e, feature)}
                  onClick={() => HandleOnClick(feature)}
                  tabIndex={0}
                >
                  {address}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}

export default Dropdown
