import { motion } from 'framer-motion'
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
      animate: !isOpen ? 'list_close' : 'list_open',
      variants: { ...Variants.list },
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
    <>
      <MotionDiv {...AnimationProps.list} framerKey="feature-list">
        <p className="mb-3 font-nunito text-lg font-semibold">
          Top in New York
        </p>
        {data ? <FeaturedList topFeatures={data} /> : <LoadingList size={10} />}
      </MotionDiv>
      <motion.p
        {...AnimationProps.list}
        className={`mb-2 font-nunito text-lg font-semibold`}
        key="nearby-title"
      >
        Nearby
      </motion.p>
      <MotionDiv
        {...AnimationProps.list}
        classNames="overflow-y-auto"
        framerKey="nearby-list"
      >
        {isLoading && (
          <MotionDiv {...AnimationProps.list_load} framerKey="loading-list">
            <LoadingList
              fullWidth={true}
              size={size ? size : 10}
              flexDirection={'flex-col'}
              scrollDirection={'overflow-y-scroll'}
            />
          </MotionDiv>
        )}
        {!isLoading && memoizedFeatures.length > 0 ? (
          <MotionDiv {...AnimationProps.list_load} framerKey="nearby-list">
            <NearbyList data={memoizedFeatures} />
          </MotionDiv>
        ) : (
          <span className="block w-full text-center font-nunito font-normal">
            no cats nearby 😿
          </span>
        )}
      </MotionDiv>
    </>
  )
}

export default ListDrawer
