import { motion, AnimationProps, AnimatePresence } from 'framer-motion'
import RotatingAddSign from '../../../../svg/RotatingAddSign'
import { useDrawerContext } from '../../DrawerProvider'

const AddButton = () => {
  const { isOpen, setIsOpen, setInputValue, setData } = useDrawerContext()

  const Variants = {
    button: {
      key_down: {
        boxShadow:
          'inset 1px 1px 3px rgba(0,0,0,.25), 0 1px 2px rgba(0,0,0,.05)',
        scale: 0.99999,
      },
      key_up: { boxShadow: '0 2px 4px rgba(0,0,0,.05)' },
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
    <motion.button
      layout
      initial={'key_up'}
      whileTap={'key_down'}
      //whileFocus={'focus'}
      exit={{ opacity: 0 }}
      transition={{ delay: 0, ease: 'linear', duration: 0.125 }}
      variants={Variants.button}
      key={`open-search-button`}
      className="group cursor-pointer rounded-[10px] border border-[rgba(0,0,0,.08)] bg-white p-1 shadow-[0_2px_4px_rgba(0,0,0,.04)]"
      onClick={() => handleNewCatCTA()}
    >
      <RotatingAddSign isOpen={isOpen} />
    </motion.button>
  )
}

export default AddButton
