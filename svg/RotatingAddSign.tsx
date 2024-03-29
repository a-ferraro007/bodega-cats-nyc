import { AnimatePresence, motion, Variants } from 'framer-motion'

type RotatingAddSignProps = {
  isOpen: boolean
}

const RotatingAddSign = ({ isOpen }: RotatingAddSignProps) => {
  return (
    <AnimatePresence>
      <motion.svg
        layout
        initial={'add_close'}
        animate={isOpen ? 'add_open' : 'add_close'}
        exit={'add_close'}
        variants={{
          add_open: { rotate: -45 },
          add_close: { rotate: 0 },
        }}
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
        key="add_open"
        className="h-full max-h-[30px] w-full max-w-[30px]"
      >
        <g strokeWidth="0"></g>
        <g
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#242424"
          strokeWidth={2}
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 3a1 1 0 0 0-1 1v7H4a1 1 0 1 0 0 2h7v7a1 1 0 1 0 2 0v-7h7a1 1 0 1 0 0-2h-7V4a1 1 0 0 0-1-1z"
            fill="#242424"
          ></path>
        </g>
      </motion.svg>
    </AnimatePresence>
  )
}

export default RotatingAddSign
