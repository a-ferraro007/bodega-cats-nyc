import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useEffect } from 'react'
import { Feature } from '../../../constants/types'
import { useCardListSize, useIsMobile } from '../../../hooks'
import { useFeatureStore } from '../../../store'
import { trpc } from '../../../utils/trpc'
import { useDrawerContext } from '../DrawerProvider'
import LoadingList from '../LoadingList'
import FeaturedList from './FeaturedList'
import NearbyList from './NearbyList'
const { select } = trpc
const ListDrawer = () => {
  const isMobile = useIsMobile()
  const size = useCardListSize('height')
  const { isOpen } = useDrawerContext()
  const { features: featureMap, isLoading } = useFeatureStore((state) => state)
  const { data, isLoading: isTopInAreaLoading } =
    select.selectTopInArea.useQuery('Brooklyn', {
      enabled: true,
    })
  const memoizedFeatures = useMemo<Array<Feature>>(() => {
    const array: Array<Feature> = []
    featureMap.forEach(({ feature }) => {
      array.push(feature)
    })
    return array
  }, [featureMap])

  return (
    <AnimatePresence>
      {!isOpen && (
        <div className="flex h-full flex-col gap-2 overflow-hidden">
          <div>
            <p className="mb-3 font-nunito text-lg font-semibold">
              Top in New York
            </p>
            {data ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0, ease: 'linear', duration: 0.25 }}
                layout
                key={data ? 'featured-list-open' : 'featured-list-close'}
              >
                <FeaturedList topFeatures={data} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0, ease: 'linear', duration: 0.25 }}
                layout
                key={
                  isTopInAreaLoading
                    ? 'loading-top-loading'
                    : 'loading-top-loaded'
                }
              >
                <LoadingList size={10} />
              </motion.div>
            )}
          </div>

          <p className="font-nunito text-lg font-semibold">Nearby</p>
          <div className="h-full overflow-y-auto">
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0, ease: 'linear', duration: 0.25 }}
                layout
                key={
                  isTopInAreaLoading
                    ? 'loading-nearby-loading'
                    : 'loading-nearby-loaded'
                }
              >
                <LoadingList
                  fullWidth={true}
                  size={size ? size : 10}
                  flexDirection={'flex-col'}
                  scrollDirection={'overflow-y-hidden'}
                />
              </motion.div>
            )}
            {!isLoading && memoizedFeatures.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0, ease: 'linear', duration: 0.25 }}
                layout
                key={
                  !isLoading && memoizedFeatures.length > 0
                    ? 'nearby-list-open'
                    : 'nearby-list-close'
                }
              >
                <NearbyList data={memoizedFeatures} />
              </motion.div>
            ) : (
              <p className="w-full text-center font-nunito font-normal">
                no cats nearby 😿
              </p>
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ListDrawer
