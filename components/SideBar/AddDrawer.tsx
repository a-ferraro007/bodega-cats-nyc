import { motion } from 'framer-motion'
import { useState, useEffect, useMemo, ChangeEvent } from 'react'
import { useDebounce, useLoadingDebounce } from '../../hooks'
import Close from '../../svg/Close'
import SearchIcon from '../../svg/SearchIcon'
import { trpc } from '../../utils/trpc'
import MotionDiv from '../MotionDiv'

const AddDrawer = ({ isOpen, handleNewCatCTA }: any) => {
  const [inputValue, setInputValue] = useState<string>('')
  const debounce = useDebounce(inputValue, 500)
  const [isInputFocused, setisInputFocused] = useState(false)
  const { data, isLoading } = trpc.searchByPlace.useQuery(debounce, {
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    console.log(data)
  }, [data])

  const handleOnFocus = () => setisInputFocused(true)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleOnBlur = () => {
    setisInputFocused(false)
  }

  const Variants = {
    add: {
      add_open: { opacity: 1, rotate: 135 },
      add_close: { opacity: 1, rotate: 0 },
    },
    input: {
      input_open: { opacity: 1, width: '100%', visibility: 'visible' },
      input_close: { opacity: 1, width: '25%', visibility: 'hidden' },
    },
  }
  const AnimationProps = {
    add: {
      initial: 'add_close',
      animate: isOpen ? 'add_open' : 'add_close',
      variants: { ...Variants.add },
      exit: { opacity: 0 },
      transition: {
        delay: 0,
        type: 'spring',
        //ease: '',
        stiffness: 100,
        damping: 10,
        duration: 0.25,
      },
    },
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
    <div className="flex flex-row justify-end gap-3">
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
            placeholder="search a location to add"
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
      <div className="mb-6 max-w-[250px]">
        <button
          className="group rounded-[10px] bg-[#f5f4f1] p-1"
          onClick={() => handleNewCatCTA()}
        >
          <motion.svg
            {...AnimationProps.add}
            className=""
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g strokeWidth="0"></g>
            <g
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#292929"
              strokeWidth={2}
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 3a1 1 0 0 0-1 1v7H4a1 1 0 1 0 0 2h7v7a1 1 0 1 0 2 0v-7h7a1 1 0 1 0 0-2h-7V4a1 1 0 0 0-1-1z"
                fill="#292929"
              ></path>
            </g>
          </motion.svg>
        </button>
      </div>
    </div>
  )
}

export default AddDrawer
