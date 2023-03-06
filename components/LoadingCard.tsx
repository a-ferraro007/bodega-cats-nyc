// new type for loading card props
type LoadingCardProps = {
  fullWidth: boolean
}

const LoadingCard = ({ fullWidth }: LoadingCardProps) => {
  const width = fullWidth ? 'w-full' : 'w-72'
  return (
    <div
      className={`mb-3 h-40 animate-pulse rounded-[15px] border border-[#dad8d2] bg-[#f5f4f1] p-4 transition-all duration-300 ${width}`}
    ></div>
  )
}

export default LoadingCard
