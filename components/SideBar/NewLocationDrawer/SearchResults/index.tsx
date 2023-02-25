import { KeyboardEvent } from 'react'
import {
  FeatureDrawerState,
  NewLocationInterface,
} from '../../../../constants/types'
import BoroughBadge from '../../BoroughBadge'
import { useDrawerContext } from '../../DrawerProvider'

const SearchDrawer = () => {
  const {
    data,
    newLocationIsOpen,
    setNewLocationIsOpen,
    setNewLocation,
    isOpen,
    setIsOpen,
  } = useDrawerContext()
  const HandleOnKeyDown = (e: KeyboardEvent, selected: FeatureDrawerState) => {}

  const handleOnClick = (selected: NewLocationInterface) => {
    setNewLocation(selected)
    //setIsOpen(false)
    setNewLocationIsOpen(true)
  }

  return (
    <ul className="overflow-y-scroll">
      {data &&
        data.map((feature: NewLocationInterface) => {
          const { ParsedFeature } = feature
          return (
            <li
              key={ParsedFeature?.feature_id}
              className="my-4 cursor-pointer rounded-[15px] border-[1px] border-[#dad8d2] px-4 py-6 transition-all duration-200 first:mt-0 last:mb-0 hover:bg-[#f5f4f1]"
              onClick={() => handleOnClick(feature)}
              //onKeyDown={(e) => HandleOnKeyDown(e, feature)}
              tabIndex={0}
            >
              <span className="text-md block pb-1 font-nunito font-bold">
                {ParsedFeature?.name}
              </span>
              <p className="mb-4 font-roboto text-xs font-normal  ">
                {' '}
                {ParsedFeature?.address}
              </p>

              {ParsedFeature?.locality && (
                <div className="border-t-[1px] border-solid border-[#dad8d2] pt-4">
                  <BoroughBadge locality={ParsedFeature?.locality} />
                </div>
              )}
            </li>
          )
        })}
    </ul>
  )
}

export default SearchDrawer
{
  /*<li
key={ParsedFeature?.feature_id}
className="my-2 p-4 cursor-pointer border-b-[1px] border-b-gray-300 transition-all duration-200 hover:border-b-gray-100 hover:bg-slate-200 hover:rounded-md last:border-b-0"
onClick={() => HandleOnClick(feature)}
onKeyDown={(e) => HandleOnKeyDown(e, feature)}
tabIndex={0}
>
<span className="block font-nunito font-bold text-sm">{ParsedFeature?.name}</span>
<span className="font-roboto font-normal text-xs"> {ParsedFeature?.address}</span>

{ParsedFeature?.locality && <BoroughBadge locality={ParsedFeature?.locality} />}
</li>*/
}
