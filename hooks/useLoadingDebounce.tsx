import { useState, useEffect } from 'react'

//https://github.com/TanStack/query/issues/293
const useLoadingDebounce = (
  isLoading: boolean,
  setIsLoading: (isLoading: boolean) => void,
  delay: number
) => {
  useEffect(() => {
    let handler: NodeJS.Timeout
    if (!isLoading) {
      handler = setTimeout(() => {
        setIsLoading(isLoading)
      }, delay)
    } else setIsLoading(isLoading)
    return () => {
      clearTimeout(handler)
    }
  }, [isLoading, delay, setIsLoading])
}

export default useLoadingDebounce
