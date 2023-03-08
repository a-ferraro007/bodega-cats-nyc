import AddButton from './AddButton'
import SearchInput from './SearchInput'

const SearchBar = () => {
  return (
    <div className="mt-4 mb-2 flex flex-row justify-end gap-3">
      <SearchInput />
      <AddButton />
    </div>
  )
}

export default SearchBar
