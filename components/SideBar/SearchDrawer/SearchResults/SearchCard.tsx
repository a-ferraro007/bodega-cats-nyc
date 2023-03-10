import BoroughBadge from '../../BoroughBadge'
import { SearchCardProps } from '../../../../constants/types'

const SearchCard = ({ location, classNames }: SearchCardProps) => {
  const { name, address, locality } = location
  const { listItem, cardContainer } = classNames

  return (
    <li
      className={`${listItem}`}
      onClick={() => {
        console.log(location)
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
      </div>
    </li>
  )
}

export default SearchCard
