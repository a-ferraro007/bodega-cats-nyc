import shallow from 'zustand/shallow'
import { ParsedAddressFeature, SearchLocation } from '../../constants/types'
import { useAddressSearchStore } from '../../store'
import { useDropdown } from './DrowpdownProvider'

const Dropdown = () => {
  const { setSearchLocationState } = useAddressSearchStore(
    (state) => state,
    shallow
  )

  const { data } = useDropdown()

  const HandleOnClick = (selected: SearchLocation) => {
    setSearchLocationState({
      address: selected.address,
      lnglat: selected.lnglat,
    })
  }

  const HandleOnKeyDown = (
    e: KeyboardEvent,
    selected: ParsedAddressFeature
  ) => {
    if (e.key === 'Enter') {
      HandleOnClick(selected)
    }
  }

  return (
    <>
      {data?.length > 0 && (
        <div className="absolute top-12 left-0 right-0 z-20 mx-auto min-h-[200px] w-[98%] rounded-[10px] bg-white shadow-5xl ">
          <ul className="my-3 h-full max-h-[250px]  overflow-scroll px-4">
            {data?.map((feature: ParsedAddressFeature) => {
              const { name, feature_id } = feature
              return (
                <li
                  className="cursor-pointer rounded-[10px] p-3 font-nunito font-medium hover:bg-[#f5f4f1]"
                  key={feature_id}
                  tabIndex={1}
                  onClick={() => HandleOnClick(feature)}
                >
                  {name}
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
