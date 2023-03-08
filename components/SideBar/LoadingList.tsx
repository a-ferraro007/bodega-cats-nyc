import { AnimatePresence, motion } from 'framer-motion'
import LoadingCard from '../LoadingCard'

type LoadingListProps = {
  size: number
  fKey: string
  isLoading: boolean
  fullWidth?: boolean
  flexDirection?: 'flex-row' | 'flex-col'
  scrollDirection?: 'overflow-x-hidden' | 'overflow-y-hidden'
}

const LoadingList = ({
  size,
  fKey,
  isLoading,
  fullWidth = false,
  flexDirection = 'flex-row',
  scrollDirection = 'overflow-x-hidden',
}: LoadingListProps) => {
  const list = new Array<number>(size).fill(0).map((_, i) => (
    <li key={i} className="pr-4">
      {' '}
      <LoadingCard fullWidth={fullWidth} />{' '}
    </li>
  ))
  return (
    <motion.ul
      className={`${
        flexDirection === 'flex-row' ? '-mr-6' : ''
      } flex pb-6 ${scrollDirection} ${flexDirection}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0, ease: 'linear', duration: 0.25 }}
      layout
      key={isLoading ? `loading-${fKey}` : `loaded-${fKey}`}
    >
      {list}
    </motion.ul>
  )
}

export default LoadingList
