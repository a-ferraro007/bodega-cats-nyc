import Image from 'next/image'
import BoroughBadge from '../BoroughBadge'
import { CardProps } from '../../../constants/types'

const Card = ({ feature, classNames }: CardProps) => {
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
        className={`group m-0 flex cursor-pointer flex-col justify-between rounded-[15px] transition-all duration-300 hover:bg-[#f5f4f1] ${cardContainer}`}
      >
        <div className="relative h-[8rem] w-full flex-grow overflow-hidden rounded-t-[15px] border border-b-0 border-[#dad8d2]">
          <Image
            className="h-full w-full object-cover"
            alt="feature image"
            src={src}
            fill
          />
        </div>
        <div className="rounded-b-[15px] border border-t-0  border-[#dad8d2] bg-white transition-all duration-300 group-hover:bg-[#f5f4f1] ">
          <div className="p-4">
            <span className="text-md block pb-1 font-nunito font-bold">
              {name}
            </span>
            <p className="mb-4 font-roboto text-xs font-normal  "> {address}</p>
            <div className="border-b-[.5px] border-solid border-[#dad8d2] transition-all duration-300 group-hover:border-[#242424] "></div>
            {locality && (
              <div className="pt-4">
                <BoroughBadge locality={locality} />
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}

export default Card
