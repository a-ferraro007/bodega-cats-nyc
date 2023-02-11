import { useEffect, useRef } from 'react'

const useCardListSize = (direction: 'height' | 'width') => {
  const size = useRef(0)
  useEffect(() => {
    const numerator =
      direction === 'height' ? window.innerHeight : window.innerWidth
    size.current = Math.round(numerator / 180)
  }, [direction])

  return size.current
}

export default useCardListSize
