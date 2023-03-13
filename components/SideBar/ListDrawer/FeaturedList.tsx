import { motion } from 'framer-motion'
import { Feature, FeatureInterface } from '../../../constants/types'
import Arrow from '../../../svg/Arrow'
import ListCard from './ListCard'
type FeaturedListProps = {
  topFeatures: FeatureInterface[]
  isLoading: boolean
}

const FeaturedList = ({ topFeatures, isLoading }: FeaturedListProps) => {
  const classNames = {
    listItem: 'pr-4 relative z-10 transition-all duration-300 ease-in-out',
    cardContainer: 'w-72',
  }

  return (
    <motion.ol
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0, ease: 'linear', duration: 0.25 }}
      layout
      key={isLoading ? 'featured-list-open' : 'featured-list-close'}
      className="flex overflow-x-auto py-4"
    >
      {topFeatures.map((feature: Feature) => {
        const { id } = feature
        return <ListCard classNames={classNames} feature={feature} key={id} />
      })}
      <div className="hadow-[0_2px_4px_rgba(0,0,0,.04)] borer borer-[rgba(0,0,0,.08)] group flex-shrink-0 flex-grow-0 basis-11 rounded-default bg-white">
        <button className="flex h-full w-40 cursor-pointer flex-col items-center justify-center gap-4 rounded-default border border-[rgba(0,0,0,.08)] bg-white shadow-[0_2px_4px_rgba(0,0,0,.04)]">
          <div className="group-hover:border-[rgb(36, 36, 36, .8)] rounded-full border-[1px] border-[#dad8d2] p-2 transition-all duration-300">
            <Arrow />
          </div>
          <p className="text-md font-nunito font-light text-graphite">
            View All
          </p>
        </button>
      </div>
    </motion.ol>
  )
}

export default FeaturedList
