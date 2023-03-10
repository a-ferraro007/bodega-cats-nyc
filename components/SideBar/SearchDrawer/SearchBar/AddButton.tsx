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
    setData([])
  }

  return (
    <button
      className="group rounded-[10px] border border-[rgba(0,0,0,.08)] bg-white p-1 shadow-[0_2px_4px_rgba(0,0,0,.04)]"
      onClick={() => handleNewCatCTA()}
    >
      <RotatingAddSign isOpen={isOpen} />
    </button>
  )
}

export default AddButton
