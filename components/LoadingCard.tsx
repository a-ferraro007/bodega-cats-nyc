// new type for loading card props
type LoadingCardProps = {
  fullWidth: boolean
}

const LoadingCard = ({ fullWidth }: LoadingCardProps) => {
  const width = fullWidth ? 'w-full' : 'w-72'
  return (
    <div
      className={`group mb-3 flex h-40  animate-pulse cursor-pointer flex-col justify-between rounded-[15px] border border-zinc-400 bg-zinc-300 p-4 opacity-50 transition-all duration-300 ${width}`}
    ></div>
  )
}

export default LoadingCard
