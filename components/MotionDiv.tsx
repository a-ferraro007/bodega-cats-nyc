import { motion, AnimatePresence } from 'framer-motion'

const MotionDiv = ({
  children,
  initial,
  animate,
  exit,
  transition,
  framerKey,
}: any) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      key={framerKey}
    >
      {children}
    </motion.div>
  )
}

export default MotionDiv
