import { AnimatePresence, motion } from 'framer-motion'
import { useMemo } from 'react'
import { Feature, FeatureMarker } from '../../../constants/types'
import { useCardListSize, useIsMobile } from '../../../hooks'
import { useFeatureStore } from '../../../store'
import { returnNewMarker } from '../../../utils/MapMarker'
import { trpc } from '../../../utils/trpc'
import { useDrawerContext } from '../DrawerProvider'
import LoadingList from '../LoadingList'
import FeaturedList from './FeaturedList'
import NearbyList from './NearbyList'
const { select } = trpc

const ListDrawer = () => {
  const size = useCardListSize('height')
  const { isOpen } = useDrawerContext()
  const {
    features: featureMap,
    isLoading,
    setTopFeatures,
  } = useFeatureStore((state) => state)
  const { data, isLoading: isTopInAreaLoading } =
    select.selectTopInArea.useQuery('Brooklyn', {
      enabled: true,
      onSuccess: (data) => {
        const map = new Map<string, FeatureMarker>()
        data.forEach((feature) => {
          const { MapBox_Feature } = feature
          const marker = returnNewMarker(feature, true, feature.image)
          map.set(MapBox_Feature[0].feature_id, { marker, feature })
        })
        setTopFeatures(map)
      },
    })
  const featureMemo = useMemo<Array<Feature>>(() => {
    const array: Array<Feature> = []
    featureMap.forEach(({ feature }) => {
      array.push(feature)
    })
    return array
  }, [featureMap])

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className="flex h-full flex-col overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0, ease: 'linear', duration: 0.25 }}
          layout
          key={isOpen ? `hide-drawer` : `show-drawer`}
        >
          <div>
            <p className="mb-2  font-nunito text-lg font-semibold transition-all duration-300 ">
              Top in New York
            </p>
            <AnimatePresence>
              {!isTopInAreaLoading && data && data.length > 0 ? (
                <FeaturedList
                  topFeatures={data}
                  isLoading={isTopInAreaLoading}
                />
              ) : (
                <LoadingList
                  size={10}
                  isLoading={isTopInAreaLoading}
                  fKey="feature"
                />
              )}
            </AnimatePresence>
          </div>

          <p className="my-1 font-nunito text-lg font-semibold">Nearby</p>
          <div className="flex h-full flex-col overflow-y-scroll">
            <AnimatePresence>
              {!isLoading ? (
                <NearbyList data={featureMemo} isLoading={isLoading} />
              ) : (
                <LoadingList
                  fullWidth={true}
                  size={size ? size : 10}
                  flexDirection={'flex-col'}
                  scrollDirection={'overflow-y-hidden'}
                  isLoading={isLoading}
                  fKey={'nearby'}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ListDrawer
