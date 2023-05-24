import { KeyboardEvent } from 'react'
import {
  NewLocation,
} from '../../../../constants/types'
import SearchCard from './SearchCard'

type SearchResultsProps = {
  data: NewLocation[]
}

const SearchResults = ({ data }: SearchResultsProps) => {
  return (
    <ul className="h-full scroll-m-4 overflow-y-scroll">
      {data.map((location: NewLocation, i: number) => {
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
