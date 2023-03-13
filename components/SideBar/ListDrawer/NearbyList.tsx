import { motion } from 'framer-motion'
import { Feature, FeatureInterface } from '../../../constants/types'
import ListCard from './ListCard'

type NearbyListProps = {
  data: FeatureInterface[]
  isLoading: boolean
}

//className="overflow-y-auto"
const NearbyList = ({ data, isLoading }: NearbyListProps) => {
  const classNames = {
    listItem: 'mb-4 last:mb-0',
    cardContainer: 'w-full',
  }

  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0, ease: 'linear', duration: 0.25 }}
      layout
      key={isLoading ? `loading-nearby` : `loaded-nearby`}
      className="h-full overflow-scroll"
    >
      {data.length > 0 ? (
        data.map((feature: Feature) => {
          const { id } = feature
          return <ListCard classNames={classNames} feature={feature} key={id} />
        })
      ) : (
        <p className="w-full text-center font-nunito font-normal">
          no cats nearby 😿
        </p>
      )}
    </motion.ul>
  )
}

export default NearbyList
