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
        className={`group m-0 flex cursor-pointer flex-row-reverse gap-2 rounded-[15px] transition-all duration-300 hover:bg-[#f5f4f1] ${cardContainer} max-h-[16rem] border border-[#dad8d2] p-3`}
      >
        <div className="relative h-[7rem] w-full max-w-[7rem] flex-grow overflow-hidden rounded-[10px]">
          <Image
            className="h-full w-full object-cover"
            alt="feature image"
            src={src}
            //placeholder="blur"
            fill
          />
        </div>
        <div className=" rounded-b-[15px] bg-white transition-all duration-300 group-hover:bg-[#f5f4f1] ">
          <div className="p-3">
            <span className="text-md block pb-1 font-nunito font-bold">
              {name}
            </span>
            <p className="mb-2 font-roboto text-xs font-normal"> {address}</p>
            <div className="border-b-[.5px] border-solid border-[#dad8d2] transition-all duration-300 group-hover:border-[#242424] "></div>
            {locality && (
              <div className="pt-2">
                <BoroughBadge locality={locality} />
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}

export default CardV2
