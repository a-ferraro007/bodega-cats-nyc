import { useEffect, useState } from 'react'
import { isClient } from '../utils/window'

const useIsAfterFirstRender = () => {
  const [isAfterFirstRender, setIsAfterFirstRender] = useState(false)

  useEffect(() => {
    if (isClient()) {
      setIsAfterFirstRender(true)
    }
  }, [])

  return isAfterFirstRender
}

export default useIsAfterFirstRender
