import { motion, AnimatePresence } from 'framer-motion'

const MotionDiv = ({
  children,
  initial,
  animate,
  exit,
  transition,
  key,
}: any) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      key={key}
    >
      {children}
    </motion.div>
  )
}

export default MotionDiv
