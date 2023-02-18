import { AnimationProps } from 'framer-motion'
import { ChangeEvent, useEffect } from 'react'
import Close from '../../../svg/Close'
import SearchIcon from '../../../svg/SearchIcon'
import MotionDiv from '../../MotionDiv'
import { useDrawerContext } from '../DrawerProvider'

const Input = () => {
  const {
    isOpen,
    setIsOpen,
    isInputFocused,
    setisInputFocused,
    inputValue,
    setInputValue,
  } = useDrawerContext()

  const handleOnFocus = () => setisInputFocused(true)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleOnBlur = () => {
    setisInputFocused(false)
  }

  useEffect(() => {
    console.log('is open!: ', isOpen)
  }, [isOpen])

  const Variants = {
    input: {
      input_open: { opacity: 1, width: '100%', visibility: 'visible' },
      input_close: { opacity: 1, width: '25%', visibility: 'hidden' },
    },
  }
  const AnimationProps = {
    input: {
      initial: 'input_close',
      animate: isOpen ? 'input_open' : 'input_close',
      variants: { ...Variants.input },
      exit: { opacity: 0, width: '25%', visibility: 'hidden' },
      transition: {
        delay: 0,
        ease: 'linear',
        duration: 0.1,
      },
    },
  }

  return (
    <MotionDiv
      {...AnimationProps.input}
      classNames="font-regular flex h-10 w-full flex-row gap-1 rounded-[10px] border-[rgba(0,0,0,.5)] bg-[#f5f4f1] px-2 font-nunito text-lg text-graphite outline-none transition-all duration-500  placeholder:text-graphite md:gap-3 md:px-4"
      framerKey="add-input"
      onBlur={() => handleOnBlur()}
      onFocus={() => handleOnFocus()}
    >
      <span className="mb-1 self-center">
        <SearchIcon color="black" width={20} height={20} />
      </span>
      <div className="flex-grow">
        <input
          className="font-regular placeholder:text-md h-full w-full bg-[#f5f4f1] font-nunito text-lg text-graphite outline-none transition-all duration-500 placeholder:pl-1 placeholder:text-base placeholder:text-[rgb(93,93,93)]"
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
    </MotionDiv>
  )
}

export default Input
