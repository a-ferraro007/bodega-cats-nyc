import { SupabaseClient } from '@supabase/supabase-js'
import {
  FeatureDrawerState,
  LngLat,
  NewLocation,
  ParsedAddressFeature,
  ParsedSearchLocation,
  SearchLocation,
} from '../../../constants/types'

const getSearchResults = async (query: string): Promise<Array<NewLocation>> => {
  try {
    var requestOptions = <RequestInit>{
      method: 'GET',
      redirect: 'follow',
    }

    const resp = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        query
      )}.json?fuzzyMatch=true&types=poi&bbox=-74.26379, 40.3923, -73.667498, 40.94285&autocomplete=true&limit=10&access_token=pk.eyJ1IjoidG9ueS1waXp6YSIsImEiOiJjbDltNXZ3eGE0ank0M25tdmZwaGMwY3psIn0.yxAZrLLcNHNyot9Cj4twsA`,
      requestOptions
    )

    const { features } = await resp.json()

    const mappedFeatures: Array<NewLocation> = features.map((feature: any) => {
      const {
        id,
        type,
        geometry,
        place_name,
        place_type,
        center,
        context,
        text,
        properties,
      } = feature
      const splitPlaceName = place_name?.split(',')
      let locality = context.find((item: any) =>
        item.id.includes('locality')
      )?.text
      if (locality)
        locality =
          locality.charAt(0).toUpperCase() + locality.slice(1, locality.length)

      return {
        ParsedFeature: {
          feature_id: id,
          name: splitPlaceName[0],
          address: properties.address + ', New York, New York',
          locality,
          center,
        },
        Feature: {
          id,
          type,
          geometry,
          place_type,
        },
      }
    })

    return mappedFeatures
  } catch (error) {
    throw error
  }
}

const getLngLatResults = async (
  lnglat: LngLat | undefined
): Promise<ParsedSearchLocation> => {
  if (!lnglat) return <ParsedSearchLocation>{}
  try {
    var requestOptions = <RequestInit>{
      method: 'GET',
      redirect: 'follow',
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
    const {
      id,
      type,
      geometry,
      place_name,
      place_type,
      center,
      context,
      text,
      properties,
    } = features[0]
    return <ParsedSearchLocation>{
      feature_id: id,
      address: place_name,
    }
  } catch (error) {
    throw error
  }
}

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
    throw error
  }
}

export { getSearchResults, getLngLatResults, fetchAddressSearchResults }
