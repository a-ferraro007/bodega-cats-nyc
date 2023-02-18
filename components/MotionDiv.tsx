import { motion, AnimatePresence } from 'framer-motion'

const MotionDiv = ({
  children,
  classNames,
  initial,
  animate,
  exit,
  transition,
  framerKey,
  variants,
}: any) => {
  return (
    <motion.div
      className={classNames}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      variants={variants}
      key={framerKey}
    >
      {children}
    </motion.div>
  )
}

export default MotionDiv
