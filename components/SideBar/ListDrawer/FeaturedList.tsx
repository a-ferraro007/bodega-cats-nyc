import { AnimatePresence, motion } from 'framer-motion'
import { Feature, FeatureInterface } from '../../../constants/types'
import Arrow from '../../../svg/Arrow'
import { returnNewMarker } from '../../../utils/MapMarker'
import BoroughBadge from '../BoroughBadge'
import Card from './Card'
type FeaturedListProps = {
  topFeatures: FeatureInterface[]
  isLoading: boolean
}

const FeaturedList = ({ topFeatures, isLoading }: FeaturedListProps) => {
  const classNames = {
    listItem: 'pr-4',
    cardContainer: 'w-72',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0, ease: 'linear', duration: 0.25 }}
      layout
      key={isLoading ? 'featured-list-open' : 'featured-list-close'}
    >
      {topFeatures.length > 0 && (
        <ol className="-mr-6 flex overflow-x-auto pb-4">
          {topFeatures.map((feature: Feature) => {
            const { id } = feature
            return <Card classNames={classNames} feature={feature} key={id} />
          })}
          <div className="group flex-shrink-0 flex-grow-0 basis-11 pr-6">
            <button className="flex h-full w-40 cursor-pointer flex-col items-center justify-center gap-4 rounded-[15px] border border-[#dad8d2] hover:bg-[#f5f4f1]">
              <div className="rounded-full border-[1px] border-[#dad8d2] p-2 transition-all duration-300 group-hover:border-[#242424]">
                <Arrow />
              </div>
              <p className="text-md font-nunito font-light text-graphite">
                View All
              </p>
            </button>
          </div>
        </ol>
      )}
    </motion.div>
  )
}

export default FeaturedList
