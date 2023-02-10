import LoadingCard from '../LoadingCard'

type LoadingListProps = {
    flexDirection?: 'flex-row' | 'flex-col'
    size: number
}

const LoadingList = ({
    flexDirection = 'flex-row',
    size,
}: LoadingListProps) => {
    return (
        <ol className={`-mr-6 flex overflow-x-scroll pb-6 ${flexDirection}`}>
            {new Array<number>(size).fill(0).map((_, i) => (
                <li key={i} className="pr-4">
                    {' '}
                    <LoadingCard />{' '}
                </li>
            ))}
        </ol>
    )
}

export default LoadingList
