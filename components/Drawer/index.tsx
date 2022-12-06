import { AnimatePresence, motion } from 'framer-motion'
const Drawer = ({ children, motionKey, props }: any) => {
  //let props =
  return (
    <motion.div
      className="relative md:max-w-[325px] w-full gap-4 h-full max-h-[400px] md:max-h-full overflow-scroll md:overflow-hidden md:rounded-r-none md:rounded-br-none md:rounded-[15px] bg-ice"
      key={motionKey}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Drawer
