import LoadingCard from '../LoadingCard'

type LoadingListProps = {
  size: number
  fullWidth?: boolean
  flexDirection?: 'flex-row' | 'flex-col'
}

const LoadingList = ({
  flexDirection = 'flex-row',
  size,
  fullWidth = false,
}: LoadingListProps) => {
  return (
    <ol className={`-mr-6 flex overflow-x-scroll pb-6 ${flexDirection}`}>
      {new Array<number>(size).fill(0).map((_, i) => (
        <li key={i} className="pr-4">
          {' '}
          <LoadingCard fullWidth={fullWidth} />{' '}
        </li>
      ))}
    </ol>
  )
}

export default LoadingList
