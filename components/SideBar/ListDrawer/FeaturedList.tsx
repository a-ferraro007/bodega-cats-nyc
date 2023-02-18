import { Feature, FeatureInterface } from '../../../constants/types'
import Arrow from '../../../svg/Arrow'
import { returnNewMarker } from '../../../utils/MapMarker'
import BoroughBadge from '../BoroughBadge'
type FeaturedListProps = {
  topFeatures: FeatureInterface[]
}

const FeaturedList = ({ topFeatures }: FeaturedListProps) => {
  return (
    <>
      {topFeatures.length > 0 && (
        <ol className="-mr-6 flex overflow-x-auto pb-4">
          {topFeatures.map((feature: Feature) => {
            const { id, MapBox_Feature, name, locality } = feature
            const { address } = MapBox_Feature[0]
            return (
              <li
                key={id}
                className="pr-4"
                onClick={() => {
                  console.log(feature, MapBox_Feature)
                }}
                tabIndex={0}
              >
                <div className="group m-0 flex h-40 w-72 cursor-pointer flex-col justify-between rounded-[15px] border border-[#dad8d2] p-4 transition-all duration-300 hover:bg-[#f5f4f1]">
                  <span className="text-md block pb-1 font-nunito font-bold">
                    {name}
                  </span>
                  <p className="mb-4 font-roboto text-xs font-normal  ">
                    {' '}
                    {address}
                  </p>
                  <div className="border-b-[.5px] border-solid border-[#dad8d2] transition-all duration-300 group-hover:border-[#242424] "></div>
                  {locality && (
                    <div className="pt-4">
                      <BoroughBadge locality={locality} />
                    </div>
                  )}
                </div>
              </li>
            )
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
    </>
  )
}

export default FeaturedList
