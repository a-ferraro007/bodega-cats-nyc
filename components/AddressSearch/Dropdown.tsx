import { AnimatePresence } from 'framer-motion'
import { KeyboardEvent } from 'react'
import { SearchLocation } from '../../constants/types'
import { useAddressSearchStore } from '../../store'
import MotionDiv from '../MotionDiv'
import { useDropdownContext } from './DrowpdownProvider'
import LoadingDropdown from './LoadingDropdown'

const Dropdown = () => {
  const { data, query, openDropdown, setOpenDropdown, isLoading } =
    useDropdownContext()
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
      ease: 'linear',
      duration: 0.25,
    },
  }

  return (
    <div className="absolute top-16 left-0 right-0 z-20">
      <AnimatePresence>
        {openDropdown && (
          <MotionDiv {...dropDownAnimationProps} framerKey={'drop-down'}>
            <div className="mx-auto min-h-[250px] w-[98%] rounded-[10px] bg-white shadow-5xl md:top-12">
              {!isLoading && (
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
              )}
              {isLoading && <LoadingDropdown />}
              {!isLoading && data?.length === 0 && (
                <span className="block w-full text-center font-nunito font-semibold">
                  {' '}
                  {query.length ? 'address not found' : 'enter an address'}
                </span>
              )}
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Dropdown
