import { motion } from 'framer-motion'
import { KeyboardEvent } from 'react'
import {
  FeatureDrawerState,
  NewLocationInterface,
} from '../../../../constants/types'
import BoroughBadge from '../../BoroughBadge'
import { useDrawerContext } from '../../DrawerProvider'
import SearchCard from './SearchCard'

const SearchResults = () => {
  const { data } = useDrawerContext()

  const HandleOnKeyDown = (e: KeyboardEvent, selected: FeatureDrawerState) => {}

  return (
    <ul className="h-full scroll-m-4 overflow-y-scroll">
      {data &&
        data.map((location: NewLocationInterface, i: number) => {
          return (
            <SearchCard
              classNames={{
                listItem: 'mb-4 last:mb-0',
                cardContainer: 'w-full',
              }}
              location={location}
              key={i}
            />
          )
        })}
    </ul>
  )
}

export default SearchResults
{
  /*<li
key={ParsedFeature?.feature_id}
className="my-2 p-4 cursor-pointer border-b-[1px] border-b-gray-300 transition-all duration-200 hover:border-b-gray-100 hover:bg-slate-200 hover:rounded-md last:border-b-0"
onClick={() => HandleOnClick(feature)}
onKeyDown={(e) => HandleOnKeyDown(e, feature)}
tabIndex={0}
>
<span className="block font-nunito font-bold text-sm">{ParsedFeature?.name}</span>
<span className="font-roboto font-normal text-xs"> {ParsedFeature?.address}</span>

{ParsedFeature?.locality && <BoroughBadge locality={ParsedFeature?.locality} />}
</li>*/
}
