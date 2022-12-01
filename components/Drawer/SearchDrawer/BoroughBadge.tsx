import { Borough } from '../../../constants/types'

type BoroughBadgeProps = {
  locality: string
}

const BoroughBadge = ({ locality }: BoroughBadgeProps) => {
  let classNames
  switch (locality) {
    case Borough.Manhattan:
      classNames = 'text-[#436f00] border-[.5px] border-[#9bc438] bg-[#e9f5ce]'
      break
    case Borough.Queens:
      classNames = 'text-[#4629BA] border-[.5px] border-[#AD99FF] bg-[#EFEBFF]'
      break
    case Borough.Brooklyn:
      classNames = 'text-[#0063b8] border-[.5px] border-[#5cc1ee] bg-[#d9f5fd]'
      break
    case Borough.Bronx:
      classNames = 'text-[#bb2a33] border-[.5px] border-[#ff99a1] bg-[#ffecee]'
      break
    case Borough.StatenIsland:
      classNames = 'text-[#925400] border-[.5px] border-[#e6ac28] bg-[#feefcb]'
      break
    default:
      classNames = 'text-[#925400] border-[.5px] border-[#e6ac28] bg-[#feefcb]'
      break
  }
  return (
    <div>
      <span
        className={`${classNames} font-roboto font-medium text-[.55rem] leading-none py-1 px-2 rounded-2xl`}
      >
        {' '}
        {locality}
      </span>
    </div>
  )
}

export default BoroughBadge
