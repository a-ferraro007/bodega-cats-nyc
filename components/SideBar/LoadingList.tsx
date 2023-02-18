import LoadingCard from '../LoadingCard'

type LoadingListProps = {
  size: number
  fullWidth?: boolean
  flexDirection?: 'flex-row' | 'flex-col'
  scrollDirection?: 'overflow-x-scroll' | 'overflow-y-scroll'
}

const LoadingList = ({
  size,
  fullWidth = false,
  flexDirection = 'flex-row',
  scrollDirection = 'overflow-x-scroll',
}: LoadingListProps) => {
  return (
    <ul className={`-mr-6 flex pb-6 ${scrollDirection} ${flexDirection}`}>
      {new Array<number>(size).fill(0).map((_, i) => (
        <li key={i} className="pr-4">
          {' '}
          <LoadingCard fullWidth={fullWidth} />{' '}
        </li>
      ))}
    </ul>
  )
}

export default LoadingList
