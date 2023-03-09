import Image from 'next/image'
import BoroughBadge from '../BoroughBadge'
import { CardProps } from '../../../constants/types'

const CardV2 = ({ feature, classNames }: CardProps) => {
  const { id, MapBox_Feature, name, locality, image: src } = feature
  const { address } = MapBox_Feature[0]
  const { listItem, cardContainer } = classNames

  return (
    <li
      className={`${listItem}`}
      onClick={() => {
        console.log(feature, MapBox_Feature)
      }}
      tabIndex={0}
    >
      <div
        className={`group m-0 flex  cursor-pointer gap-2 rounded-[15px] bg-[#f5f4f1] transition-all duration-300 ${cardContainer} borde max-h-[16rem] border-[dad8d2] px-3 py-4 hover:bg-[#ECEAE4]`}
      >
        <div className="group-hover:bg-[#45, 17%, 91%] flex-grow flex-wrap rounded-[15px] px-2 transition-all duration-300  ">
          <span className="text-md block pb-1 font-nunito font-bold">
            {name}
          </span>
          <p className="mb-2 font-roboto text-xs font-normal"> {address} </p>
          <div className="brder-[#dad8d2] border-b-[.5px] border-solid transition-all duration-300 group-hover:border-[#242424] "></div>
          {locality && (
            <div className="pt-2">
              <BoroughBadge locality={locality} />
            </div>
          )}
        </div>
        <div className="relative h-[7rem] w-full max-w-[7rem] flex-grow overflow-hidden rounded-[10px]">
          <Image
            className="h-full w-full object-cover"
            alt="feature image"
            src={src}
            //placeholder="blur"
            fill
          />
          <div className="shadow-[inset_0_0_0_1px_rgb(0 ,0 ,0, .6)] pointer-events-none absolute inset-0 rounded-[15px]"></div>
        </div>
      </div>
    </li>
  )
}

export default CardV2
