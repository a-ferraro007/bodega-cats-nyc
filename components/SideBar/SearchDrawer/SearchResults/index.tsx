import { KeyboardEvent } from 'react'
import {
  FeatureDrawerState,
  NewLocationInterface,
} from '../../../../constants/types'
import SearchCard from './SearchCard'

type SearchResultsProps = {
  data: NewLocationInterface[]
}

const SearchResults = ({ data }: SearchResultsProps) => {
  const HandleOnKeyDown = (e: KeyboardEvent, selected: FeatureDrawerState) => {}

  return (
    <ul className="h-full scroll-m-4 overflow-y-scroll">
      {data.map((location: NewLocationInterface, i: number) => {
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
