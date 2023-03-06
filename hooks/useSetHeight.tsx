import { useEffect, useState } from 'react'
import { getHeight } from '../utils/window'
import useIsAfterFirstRender from './useIsAfterFirstRender'
import useIsMobile from './useIsMobile'

const useSetHeight = (): any | null => {
  const isMobile = useIsMobile()
  const isAfterFirstRender = useIsAfterFirstRender()
  const [height, setHeight] = useState<any | null>(getHeight)

  useEffect(() => {
    if (!isAfterFirstRender) return
    function handleWindowSizeChange() {
      if (!isMobile) {
        setHeight({ height: '100vh' })
        return
      }
      const styleHeight = getHeight()
      setHeight(styleHeight)
    }
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [isAfterFirstRender, isMobile])
  return isAfterFirstRender ? height : null
}

export default useSetHeight
