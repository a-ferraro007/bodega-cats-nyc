import { useMemo, useState } from 'react'
import { useFeatureStore, useStore } from '../../store'
import { trpc } from '../../utils/trpc'
import NearbyList from './NearbyList'
import FeaturedList from './FeaturedList'
import LoadingList from './LoadingList'
import { useCardListSize } from '../../hooks'
import MotionDiv from '../MotionDiv'
import { AnimatePresence, motion } from 'framer-motion'
import { Feature } from '../../constants/types'

const SideBar = () => {
  const size = useCardListSize('height')
  const [isOpen, setIsOpen] = useState<boolean | null>(null)
  const showMobileMap = useStore((state) => state.showMobileMap)
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

  const listLoadAnimationProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      delay: 0,
      ease: 'linear',
      duration: 0.25,
    },
  }

  const ListVariants = {
    open: { opacity: 0 },
    close: { opacity: 1 },
  }

  const listAnimationProps = {
    initial: 'close',
    animate: isOpen ? 'open' : 'close',
    variants: { ...ListVariants },
    exit: { opacity: 0 },
    transition: {
      delay: 0,
      ease: 'easeOut',
      duration: 0.2,
    },
  }

  const ContainerVariants = {
    open: {
      width: '40%',
    },
    closed: { width: '' },
  }

  const handleNewCatCTA = () => {
    if (isOpen) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }

  return (
    <AnimatePresence>
      <MotionDiv
        classNames={`absolute z-10 h-full w-full border-l-[.5px] border-solid border-[rgba(0,0,0,.2)] bg-white md:static md:w-side-bar ${
          showMobileMap ? '' : 'hidden md:block'
        }`}
        initial={'closed'}
        animate={isOpen ? 'open' : 'closed'}
        framerKey="sideBar-container"
        variants={ContainerVariants}
      >
        <MotionDiv
          {...listAnimationProps}
          classNames="flex h-sideBarContainer flex-col p-6"
        >
          <div className="mb-6 max-w-[250px] self-end">
            <button
              className="w-full rounded-[10px] bg-dark-blue-radial-gradient p-2 px-4 font-nunito text-lg font-semibold text-white transition-colors duration-300 hover:scale-[1.03]"
              onClick={() => handleNewCatCTA()}
            >
              new cat
            </button>
          </div>
          <div>
            <p
              className="mb-3 font-nunito text-lg font-semibold"
              {...listAnimationProps}
              key="top-title"
            >
              Top in New York
            </p>
            {data ? (
              <FeaturedList topFeatures={data} />
            ) : (
              <LoadingList size={10} />
            )}
          </div>
          <p className={`mb-2 font-nunito text-lg font-semibold`}>Nearby</p>

          <div className="overflow-y-auto">
            {isLoading && (
              <MotionDiv {...listLoadAnimationProps} framerKey="loading-list">
                <LoadingList
                  fullWidth={true}
                  size={size ? size : 10}
                  flexDirection={'flex-col'}
                  scrollDirection={'overflow-y-scroll'}
                />
              </MotionDiv>
            )}
            {!isLoading && memoizedFeatures.length > 0 ? (
              <MotionDiv {...listLoadAnimationProps} framerKey="nearby-list">
                <NearbyList data={memoizedFeatures} />
              </MotionDiv>
            ) : (
              <span className="block w-full text-center font-nunito font-normal">
                no cats nearby 😿
              </span>
            )}
          </div>
        </MotionDiv>
      </MotionDiv>
    </AnimatePresence>
  )
}

export default SideBar
