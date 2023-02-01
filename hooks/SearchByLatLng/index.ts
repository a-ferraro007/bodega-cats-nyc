import { useQuery } from '@tanstack/react-query'
import { LngLat, ParsedSearchLocation } from '../../constants/types'

const getLngLatResults = async (lnglat: LngLat | undefined): Promise<ParsedSearchLocation> => {
  if (!lnglat) return <ParsedSearchLocation>{}
  try {
    var requestOptions = <RequestInit>{
      method: 'GET',
      redirect: 'follow'
    }

    const resp = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        lnglat.lng
      )},${encodeURIComponent(
        lnglat.lat
      )}.json?types=address&bbox=-74.26379, 40.3923, -73.667498, 40.94285&access_token=pk.eyJ1IjoidG9ueS1waXp6YSIsImEiOiJjbDltNXZ3eGE0ank0M25tdmZwaGMwY3psIn0.yxAZrLLcNHNyot9Cj4twsA`,
      requestOptions
    )

    const { features } = await resp.json()
    const { id, type, geometry, place_name, place_type, center, context, text, properties } =
      features[0]
    //console.log({ place_name })

    return <ParsedSearchLocation>{
      feature_id: id,
      address: place_name
    }
  } catch (error) {
    console.log('Error Fetching FeatureCollection Geo_JSON', error)
    throw error
  }
}

const useLngLatSearch = (lnglat: LngLat | undefined) => {
  return useQuery({
    queryKey: ['lnglatsearch', { lnglat }],
    queryFn: () => getLngLatResults(lnglat),
    onSuccess: () => {}
  })
}

export { useLngLatSearch as default, getLngLatResults }
