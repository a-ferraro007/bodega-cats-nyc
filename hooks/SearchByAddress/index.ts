import { LngLat, SearchLocation } from './../../constants/types'
import { useQuery } from '@tanstack/react-query'
import { ParsedAddressFeature } from '../../constants/types'
import { useStore } from '../../store'

const fetchAddressSearchResults = async (
  query: string
): Promise<Array<ParsedAddressFeature>> => {
  try {
    var requestOptions = <RequestInit>{
      method: 'GET',
      redirect: 'follow',
    }

    const resp = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        query
      )}.json?fuzzyMatch=true&types=address&bbox=-74.26379, 40.3923, -73.667498, 40.94285&autocomplete=true&limit=10&access_token=pk.eyJ1IjoidG9ueS1waXp6YSIsImEiOiJjbDltNXZ3eGE0ank0M25tdmZwaGMwY3psIn0.yxAZrLLcNHNyot9Cj4twsA`,
      requestOptions
    )

    const { features } = await resp.json()

    const mappedFeatures: Array<ParsedAddressFeature> = features.map(
      (feature: any) => {
        const {
          id,
          type,
          geometry: { coordinates },
          place_name,
          place_type,
          center,
          context,
          text,
          properties,
        } = feature

        return <SearchLocation>{
          feature_id: id,
          address: place_name,
          lnglat: {
            lng: coordinates[0],
            lat: coordinates[1],
          } as LngLat,
        }
      }
    )

    return mappedFeatures
  } catch (error) {
    //console.log('Error Fetching FeatureCollection Geo_JSON', error)
    throw error
  }
}

const useAddressSearch = (query: string) => {
  return useQuery({
    queryKey: ['addresssearch', { query }],
    queryFn: () => fetchAddressSearchResults(query),
    enabled: query.length > 0,
    onSuccess: () => {},
  })
}

export { useAddressSearch as default, fetchAddressSearchResults }
