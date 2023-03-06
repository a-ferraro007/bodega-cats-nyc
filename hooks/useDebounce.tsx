import { useState, useEffect } from 'react'

//https://github.com/TanStack/query/issues/293
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      console.log('setting timeout')
      setDebouncedValue(value)
    }, delay)
    return () => {
      console.log('clearing timeout')
      clearTimeout(handler)
    }
  }, [value, delay])

  return { debounce: debouncedValue }
}

export default useDebounce
