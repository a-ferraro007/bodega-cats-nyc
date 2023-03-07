import { motion, AnimationProps, AnimatePresence } from 'framer-motion'
import RotatingAddSign from '../../../../svg/RotatingAddSign'
import { useDrawerContext } from '../../DrawerProvider'

const AddButton = () => {
  const { isOpen, setIsOpen, setInputValue, setData } = useDrawerContext()

  const Variants = {
    add: {
      add_open: { rotate: -45 },
      add_close: { rotate: 0 },
    },
    input: {
      input_open: { width: '100%', visibility: 'visible' },
      input_close: { width: '25%', visibility: 'hidden' },
    },
  }

  const handleNewCatCTA = () => {
    if (!isOpen) {
      setIsOpen(true)
      return
    }

    setIsOpen(false)
    setInputValue('')
    setData(null)
  }

  return (
    <button
      className="group  rounded-[10px] bg-[#f5f4f1] p-1"
      onClick={() => handleNewCatCTA()}
    >
      <RotatingAddSign isOpen={isOpen} />
    </button>
  )
}

export default AddButton
