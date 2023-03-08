import { motion } from 'framer-motion'
import { Feature, FeatureInterface } from '../../../constants/types'
import BoroughBadge from '../BoroughBadge'

type NearbyListProps = {
  data: FeatureInterface[]
  isLoading: boolean
}

//className="overflow-y-auto"
const NearbyList = ({ data, isLoading }: NearbyListProps) => {
  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0, ease: 'linear', duration: 0.25 }}
      layout
      key={isLoading ? `loading-nearby` : `loaded-nearby`}
    >
      {data.length > 0 &&
        data.map((feature: Feature) => {
          const { id, MapBox_Feature, locality, name } = feature
          const { address } = MapBox_Feature[0]

          return (
            <li
              key={id}
              className="my-4 cursor-pointer list-none rounded-[15px] border-[1px] border-[#dad8d2] px-4 py-6 transition-all duration-200 last:mb-0 hover:bg-[#f5f4f1]"
              tabIndex={0}
            >
              <span className="text-md block pb-1 font-nunito font-bold">
                {name}
              </span>
              <p className="mb-4 font-roboto text-xs font-normal"> {address}</p>
              <div className="border-b-[1px] border-solid border-[#dad8d2]"></div>
              {locality && (
                <div className="pt-4">
                  <BoroughBadge locality={locality} />
                </div>
              )}
            </li>
          )
        })}
    </motion.ul>
  )
}

export default NearbyList
