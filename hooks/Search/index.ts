import { QueryKey, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'

//https://github.com/TanStack/query/issues/293
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

const fetchSearchResults = async (query: string) => {
  try {
    var requestOptions = <RequestInit>{
      method: 'GET',
      redirect: 'follow'
    }

    const resp = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        query
      )}.json?fuzzyMatch=true&bbox=-74.26379, 40.3923, -73.667498, 40.94285&autocomplete=true&access_token=pk.eyJ1IjoidG9ueS1waXp6YSIsImEiOiJjbDltNXZ3eGE0ank0M25tdmZwaGMwY3psIn0.yxAZrLLcNHNyot9Cj4twsA`,
      requestOptions
    )
    const json = await resp.json()
    return json
  } catch (error) {
    console.log('Error Fetching FeatureCollection Geo_JSON', error)
    return error
  }
}

const useSearch = (query: string) => {
  return useQuery(['search', { query }], () => fetchSearchResults(query))
}

export { useSearch, useDebounce, fetchSearchResults }
