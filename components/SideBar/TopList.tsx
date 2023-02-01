import Arrow from '../../svg/Arrow'
import BoroughBadge from './BoroughBadge'

const FeaturedList = ({ data }: any) => {
  return (
    <>
      <div>
        <p className="font-nunito font-bold text-lg mb-3">Top in New York</p>
        <ol className="flex mb-6 overflow-x-auto pb-6 -mr-6">
          {data.map((feature: any) => {
            const { id, MapBox_Feature, name, locality } = feature
            console.log(feature)

            const { address } = MapBox_Feature[0]
            return (
              <li key={id} className="pr-4" tabIndex={0}>
                <div className="flex flex-col h-40 justify-between m-0 w-72 p-4 cursor-pointer border border-[#dad8d2] rounded-[15px] hover:bg-[#f5f4f1] transition-all duration-300 group">
                  <span className="block font-nunito font-bold text-md pb-1">{name}</span>
                  <p className="font-roboto font-normal text-xs mb-4  "> {address}</p>
                  <div className="border-b-[.5px] border-solid border-[#dad8d2] group-hover:border-[#242424] transition-all duration-300 "></div>
                  {locality && (
                    <div className="pt-4">
                      <BoroughBadge locality={locality} />
                    </div>
                  )}
                </div>
              </li>
            )
          })}
          <div className="flex-grow-0 flex-shrink-0 basis-11 pr-6 group">
            <button className="flex flex-col h-full items-center justify-center gap-4 cursor-pointer w-40 border border-[#dad8d2] rounded-[15px] hover:bg-[#f5f4f1] transition-all duration-300">
              <div className="p-2 rounded-full border-[1px] border-[#dad8d2] group-hover:border-[#242424] transition-all duration-300">
                <Arrow />
              </div>
              <p className="font-nunito font-light text-md text-graphite">View All</p>
            </button>
          </div>
        </ol>
      </div>
    </>
  )
}

export default FeaturedList
