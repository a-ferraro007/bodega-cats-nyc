import { motion, AnimationProps } from 'framer-motion'
import { useDrawerContext } from '../DrawerProvider'

const AddButton = () => {
  const { isOpen, setIsOpen } = useDrawerContext()

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

  const handleNewCatCTA = () => {
    if (isOpen) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }

  return (
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
  )
}

export default AddButton
