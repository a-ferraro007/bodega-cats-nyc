import { AnimatePresence, motion } from 'framer-motion'
const Drawer = ({ children, motionKey, props }: any) => {
  //let props =
  return (
    <motion.div
      className="relative  max-w-[325px] w-full gap-4 h-full overflow-hidden rounded-r-none rounded-br-none rounded-[15px] bg-ice"
      key={motionKey}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Drawer
