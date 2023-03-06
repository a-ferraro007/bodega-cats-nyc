import { motion, AnimationProps } from 'framer-motion'
import { useDrawerContext } from '../../DrawerProvider'

const AddButton = () => {
  const { isOpen, setIsOpen, setInputValue, setData } = useDrawerContext()

  const Variants = {
    add: {
      add_open: { opacity: 1, rotate: -45 },
      add_close: { opacity: 1, rotate: 0 },
    },
    input: {
      input_open: { opacity: 1, width: '100%', visibility: 'visible' },
      input_close: { opacity: 1, width: '25%', visibility: 'hidden' },
    },
  }

  const handleNewCatCTA = () => {
    if (isOpen) {
      setIsOpen(false)
      setInputValue('')
      setData(null)
    } else {
      console.log('new cat cta')

      setIsOpen(true)
    }
  }

  return (
    <button
      className="group rounded-[10px] bg-[#f5f4f1] p-1"
      onClick={() => handleNewCatCTA()}
    >
      <motion.svg
        layout
        initial={'add_close'}
        animate={isOpen ? 'add_open' : 'add_close'}
        exit={'add_close'}
        variants={Variants.add}
        transition={{
          delay: 0,
          type: 'spring',
          stiffness: 100,
          damping: 10,
          duration: 0.25,
        }}
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        key={isOpen ? 'add-button-open' : 'add-button-close'}
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
