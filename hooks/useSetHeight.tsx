import { useEffect, useState } from 'react'
import { getHeight } from '../utils/window'
import useIsAfterFirstRender from './useIsAfterFirstRender'

const useSetHeight = (): number | null => {
  const isAfterFirstRender = useIsAfterFirstRender()
  const [height, setHeight] = useState<number | null>(getHeight)

  useEffect(() => {
    if (!isAfterFirstRender) return
    function handleWindowSizeChange() {
      const innerHeight = getHeight()
      setHeight(innerHeight)
    }
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [isAfterFirstRender])
  return isAfterFirstRender ? height : null
}

export default useSetHeight
