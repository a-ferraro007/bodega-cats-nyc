import { useMemo, useState } from 'react'
import { useFeatureStore, useStore } from '../../store'
import { trpc } from '../../utils/trpc'
import NearbyList from './NearbyList'
import FeaturedList from './FeaturedList'
import LoadingList from './LoadingList'
import { useCardListSize, useIsMobile } from '../../hooks'
import MotionDiv from '../MotionDiv'
import { AnimatePresence, motion } from 'framer-motion'
import { Feature } from '../../constants/types'
import Close from '../../svg/Close'
import InputLocation from '../../svg/InputLocation'
import SearchIcon from '../../svg/SearchIcon'
import AddDrawer from './AddDrawer'

const SideBar = () => {
  const isMobile = useIsMobile()
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
      animate: isOpen && !isMobile ? 'container_open' : 'container_close',
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
      animate: isOpen ? 'list_open' : 'list_close',
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
        {...AnimationProps.container}
        classNames={`absolute z-10 h-full w-full border-l-[.5px] border-solid border-[rgba(0,0,0,.2)] bg-white md:static md:w-side-bar ${
          showMobileMap ? '' : 'hidden md:block'
        }`}
        framerKey="sideBar-container"
      >
        <div className="flex h-sideBarContainer flex-col p-6">
          <AddDrawer isOpen={isOpen} handleNewCatCTA={handleNewCatCTA} />

          <MotionDiv {...AnimationProps.list} framerKey="feature-list">
            <p className="mb-3 font-nunito text-lg font-semibold">
              Top in New York
            </p>
            {data ? (
              <FeaturedList topFeatures={data} />
            ) : (
              <LoadingList size={10} />
            )}
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
        </div>
      </MotionDiv>
    </AnimatePresence>
  )
}

export default SideBar

{
  /*<button
className="w-full rounded-[10px] bg-dark-blue-radial-gradient p-2 px-4 font-nunito text-lg font-semibold text-white transition-colors duration-300 hover:scale-[1.03]"
onClick={() => handleNewCatCTA()}
>
new cat
</button>*/
}
