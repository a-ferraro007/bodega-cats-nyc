import { motion, AnimatePresence } from 'framer-motion'

const AnimationPrescense = ({
  children,
  initial,
  animate,
  exit,
  transition,
}: any) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default AnimationPrescense
