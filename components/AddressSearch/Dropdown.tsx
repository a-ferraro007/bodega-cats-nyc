import { KeyboardEvent, useEffect } from 'react'
import { SearchLocation } from '../../constants/types'
import { useAddressSearchStore } from '../../store'
import CatFace from '../../svg/CatFace'
import AnimationPrescense from '../AnimationPrescense'
import { useDropdown } from './DrowpdownProvider'
import LoadingDropdown from './LoadingDropdown'

const Dropdown = () => {
  const { data, setOpenDropdown, openDropdown, isLoading } = useDropdown()
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

  const dropDownAnimationProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      delay: 0,
      ease: 'easeIn',
      duration: 0.2,
    },
  }

  return (
    <>
      {openDropdown && (
        <>
          <div className="absolute top-16 left-0 right-0 z-20 mx-auto min-h-[250px] w-[98%] rounded-[10px] bg-white shadow-5xl md:top-12">
            {!isLoading && (
              <AnimationPrescense {...dropDownAnimationProps}>
                <ul className="h-full max-h-[250px] overflow-scroll p-4">
                  {data?.map(
                    ({ feature_id, address, lnglat }: SearchLocation) => {
                      const feature = { feature_id, address, lnglat }
                      return (
                        <li
                          className="my-1 cursor-pointer rounded-[10px] p-3 font-nunito font-medium first:mt-0 last:mb-0 hover:bg-[#f5f4f1] focus:bg-[#f5f4f1]"
                          key={feature_id}
                          onKeyDown={(e) => HandleOnKeyDown(e, feature)}
                          onClick={() => HandleOnClick(feature)}
                          tabIndex={0}
                        >
                          {address}
                        </li>
                      )
                    }
                  )}
                </ul>
              </AnimationPrescense>
            )}
            {isLoading && (
              <AnimationPrescense {...dropDownAnimationProps}>
                <LoadingDropdown />
              </AnimationPrescense>
            )}
            {!isLoading && data?.length === 0 && (
              <span className="block w-full text-center font-nunito font-semibold">
                {' '}
                address not found
              </span>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default Dropdown
