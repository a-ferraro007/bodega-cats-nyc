import Arrow from '../../svg/Arrow'
import BoroughBadge from './BoroughBadge'

const FeaturedList = ({ data }: any) => {
  return (
    <>
      <div>
        <ol className="mb-6 -mr-6 flex overflow-x-auto pb-6">
          {data.map((feature: any) => {
            const { id, MapBox_Feature, name, locality } = feature
            console.log(MapBox_Feature)

            const { address } = MapBox_Feature //[0]
            return (
              <li key={id} className="pr-4" tabIndex={0}>
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
            <button className="flex h-full w-40 cursor-pointer flex-col items-center justify-center gap-4 rounded-[15px] border border-[#dad8d2] transition-all duration-300 hover:bg-[#f5f4f1]">
              <div className="rounded-full border-[1px] border-[#dad8d2] p-2 transition-all duration-300 group-hover:border-[#242424]">
                <Arrow />
              </div>
              <p className="text-md font-nunito font-light text-graphite">
                View All
              </p>
            </button>
          </div>
        </ol>
      </div>
    </>
  )
}

export default FeaturedList
