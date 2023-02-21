import { useEffect, useState } from 'react'

const useSetHeight = (): number | null => {
  const [height, setHeight] = useState<number | null>(getHeight)

  useEffect(() => {
    function handleWindowSizeChange() {
      console.log('window.innerHeight: ', window.innerHeight)
      const innerHeight = getHeight()
      setHeight(innerHeight)
    }
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])
  return height || null
}

function getHeight() {
  if (!isClient()) return null
  return window.innerHeight
}

function isClient() {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

export default useSetHeight
