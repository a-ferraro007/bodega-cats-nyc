import BoroughBadge from '../../BoroughBadge'
import {
  NewLocationInterface,
  SearchCardProps,
} from '../../../../constants/types'
import { useDrawerContext } from '../../DrawerProvider'
import { motion } from 'framer-motion'

const SearchCard = ({ location, classNames }: SearchCardProps) => {
  const { setNewLocation, setNewLocOpen } = useDrawerContext()

  const { ParsedFeature } = location
  const { name, address, locality } = ParsedFeature
  const { listItem, cardContainer } = classNames
  const Variants = {
    button: {
      key_down: {
        boxShadow:
          'inset 1px 1px 3px rgba(0,0,0,.25), 0 1px 2px rgba(0,0,0,.05)',
        scale: 0.99,
        //outlineOffset: '1px',
        //outlineColor: 'hsl(0, 3%, 72%)',
      },
      key_up: { boxShadow: '0 2px 4px rgba(0,0,0,.05)' },
      //focus: {
      //  outlineOffset: '5px',
      //  outlineColor: 'hsl(0, 3%, 72%)',
      //},
    },
  }

  const handleOnClick = (selected: NewLocationInterface) => {
    setNewLocation(selected)
    setNewLocOpen(true)
  }

  return (
    <li
      className={`${listItem}`}
      onClick={() => handleOnClick(location)}
      tabIndex={0}
    >
      <motion.button
        layout
        initial={'key_up'}
        whileTap={'key_down'}
        //whileFocus={'focus'}
        exit={{ opacity: 0 }}
        transition={{ delay: 0, ease: 'linear', duration: 0.125 }}
        variants={Variants.button}
        key={`search-card-press`}
        className={`group m-0 flex cursor-pointer gap-2 rounded-default text-left transition-all duration-300 ${cardContainer}  border-[rgba(0,0,0,.08)]] max-h-[16rem] border bg-[#FFFF] p-3
        shadow-[0_2px_4px_rgba(0,0,0,.04)]`}
      >
        <div className="group-:bg-[#f5f4f1] flex-grow rounded-b-[15px] bg-[#FFFF] transition-all duration-300">
          <div className="px-3 py-2">
            <span className="text-md block pb-1 font-nunito font-bold">
              {name}
            </span>
            <p className="mb-2 font-roboto text-xs font-normal"> {address}</p>
            <div className="border-b-[.5px] border-solid border-[#dad8d2] transition-all duration-300 group-hover:border-[#242424] "></div>
            {locality && (
              <div className="pt-2">
                <BoroughBadge locality={locality} />
              </div>
            )}
          </div>
        </div>
      </motion.button>
    </li>
  )
}

export default SearchCard
