import Image from 'next/image'
import BoroughBadge from '../BoroughBadge'
import { ListCardProps } from '../../../constants/types'

const ListCard = ({ feature, classNames }: ListCardProps) => {
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
        className={`hovr:bg-[#f5f4f1] group m-0 flex cursor-pointer gap-2 rounded-[15px] transition-all duration-300 ${cardContainer}  border-[rgba(0,0,0,.08)]] max-h-[16rem] border bg-[#FFFF] p-3
        shadow-[0_2px_4px_rgba(0,0,0,.04)]`}
      >
        <div className="group-:bg-[#f5f4f1] flex-grow rounded-b-[15px] bg-[#FFFF] transition-all duration-300">
          <div className="px-3 py-2">
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
        {src && (
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
        )}
      </div>
    </li>
  )
}

export default ListCard
