import { AnimatePresence, AnimationProps, motion } from 'framer-motion'
import { ChangeEvent, useEffect } from 'react'
import Close from '../../../../svg/Close'
import SearchIcon from '../../../../svg/SearchIcon'
import MotionDiv from '../../../MotionDiv'
import { useDrawerContext } from '../../DrawerProvider'

const SearchInput = () => {
  const { isOpen, setInputFocused, inputValue, setInputValue } =
    useDrawerContext()

  const handleOnFocus = () => setInputFocused(true)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleOnBlur = () => {
    setInputFocused(false)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={'container_close'}
        animate={isOpen ? 'container_open' : 'container_close'}
        exit={{ opacity: 0, visibility: 'hidden' }}
        variants={{
          container_open: {
            width: '100%',
            opacity: 1,
            visibility: 'visible',
          },
          container_close: {
            width: '25%',
            opacity: 0,
            visibility: 'hidden',
          },
        }}
        transition={{ delay: 0, ease: 'linear', duration: 0.15 }}
        key={'add-input-close'}
      >
        <div
          className="font-regular flex h-10 w-full flex-row gap-1 rounded-[10px]  border border-[rgba(0,0,0,.08)] bg-white px-2 font-nunito  text-lg text-graphite shadow-[0_1px_3px_rgba(0,0,0,.04)] outline-none transition-all duration-500 placeholder:text-graphite md:gap-3 md:px-4"
          onBlur={() => handleOnBlur()}
          onFocus={() => handleOnFocus()}
        >
          <span className="mb-1 self-center">
            <SearchIcon color="black" width={20} height={20} />
          </span>
          <div className="flex-grow">
            <input
              className="font-regular placeholder:text-md h-full w-full bg-white font-nunito text-lg text-graphite outline-none transition-all duration-500 placeholder:pl-1 placeholder:text-base placeholder:text-[rgb(93,93,93)]"
              placeholder="search to add a location"
              id="add-location-input"
              type="search"
              value={inputValue}
              autoFocus={true}
              autoComplete="none"
              onChange={(e) => handleOnChange(e)}
              onFocus={() => handleOnFocus()}
              tabIndex={0}
            />
          </div>
          <button
            className="p-[2px] outline-none md:p-1"
            onClick={() => {
              setInputValue('')
            }}
          >
            <Close />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SearchInput
