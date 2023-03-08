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
    <>
      {!isOpen && (
        <div className="flex h-full flex-col gap-2 overflow-hidden">
          <div>
            <p className="mb-3 font-nunito text-lg font-semibold">
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

          <p className="font-nunito text-lg font-semibold">Nearby</p>
          <div className="h-full overflow-y-auto">
            <AnimatePresence>
              {isLoading ? (
                <LoadingList
                  fullWidth={true}
                  size={size ? size : 10}
                  flexDirection={'flex-col'}
                  scrollDirection={'overflow-y-hidden'}
                  isLoading={isLoading}
                  fKey={'nearby'}
                />
              ) : (
                <>
                  {memoizedFeatures.length > 0 ? (
                    <NearbyList data={memoizedFeatures} isLoading={isLoading} />
                  ) : (
                    <p className="w-full text-center font-nunito font-normal">
                      no cats nearby 😿
                    </p>
                  )}
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </>
  )
}

export default ListDrawer
