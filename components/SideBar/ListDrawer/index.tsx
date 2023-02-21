import { AnimatePresence } from 'framer-motion'
import { useMemo, useEffect } from 'react'
import { Feature } from '../../../constants/types'
import { useCardListSize, useIsMobile } from '../../../hooks'
import { useFeatureStore } from '../../../store'
import { trpc } from '../../../utils/trpc'
import MotionDiv from '../../MotionDiv'
import { useDrawerContext } from '../DrawerProvider'
import LoadingList from '../LoadingList'
import FeaturedList from './FeaturedList'
import NearbyList from './NearbyList'

const ListDrawer = () => {
  const isMobile = useIsMobile()
  const size = useCardListSize('height')
  const { isOpen } = useDrawerContext()
  const { features: featureMap, isLoading } = useFeatureStore((state) => state)
  const { data } = trpc.selectTopInArea.useQuery('Brooklyn', {
    enabled: true,
  })
  const memoizedFeatures = useMemo<Array<Feature>>(() => {
    const array: Array<Feature> = []
    featureMap.forEach(({ feature }) => {
      array.push(feature)
    })
    return array
  }, [featureMap])

  useEffect(() => {
    console.log(isOpen)
  })

  const Variants = {
    container: {
      container_open: { width: '28rem' },
      container_close: { width: '25rem' },
    },
    list: {
      list_open: { opacity: 0 },
      list_close: { opacity: 1 },
    },
    list_container: {
      list_container_open: { diplay: 'none' },
      list_container_close: { height: 'block' },
    },
  }

  const AnimationProps = {
    container: {
      initial: 'container_close',
      animate: !isOpen && !isMobile ? 'container_open' : 'container_close',
      variants: { ...Variants.container },
      exit: { opacity: 0 },
      transition: {
        delay: 0,
        ease: 'linear',
        duration: 0.25,
      },
    },
    list: {
      initial: 'list_close',
      //animate: 'list_close',
      variants: { ...Variants.list },
      exit: { opacity: 0 },
      transition: {
        delay: 0,
        ease: 'easeOut',
        duration: 0.25,
      },
    },
    list_container: {
      initial: 'list_container_close',
      animate: !isOpen ? 'list_container_close' : 'list_container_open',
      variants: { ...Variants.list_container },
      exit: { opacity: 0 },
      transition: {
        delay: 0,
        ease: 'easeOut',
        duration: 0.25,
      },
    },
    list_load: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: {
        delay: 0,
        ease: 'linear',
        duration: 0.25,
      },
    },
  }
  return (
    <AnimatePresence>
      {!isOpen && (
        <div className="flex h-full flex-col gap-2">
          <MotionDiv
            {...AnimationProps.list}
            framerKey="feature-list-container"
          >
            <p className="mb-3 font-nunito text-lg font-semibold">
              Top in New York
            </p>
            {data ? (
              <FeaturedList topFeatures={data} />
            ) : (
              <LoadingList size={10} />
            )}
          </MotionDiv>

          <p className="font-nunito text-lg font-semibold">Nearby</p>
          <div className="h-full overflow-y-auto">
            {isLoading && (
              <MotionDiv {...AnimationProps.list_load} framerKey="loading-list">
                <LoadingList
                  fullWidth={true}
                  size={size ? size : 10}
                  flexDirection={'flex-col'}
                  scrollDirection={'overflow-y-hidden'}
                />
              </MotionDiv>
            )}
            {!isLoading && memoizedFeatures.length > 0 ? (
              <MotionDiv {...AnimationProps.list} framerKey="nearby-list">
                <NearbyList data={memoizedFeatures} />
              </MotionDiv>
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
