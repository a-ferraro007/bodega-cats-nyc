import { Locality, zGeometry, zLocality } from './../../../constants/types'
import { SupabaseClient } from '@supabase/supabase-js'
import {
  FeatureDrawerState,
  LngLat,
  NewLocation,
  ParsedAddressFeature,
  ParsedSearchLocation,
  SearchLocation,
} from '../../../constants/types'
import {
  AddressComponent,
  AddressType,
  Client,
  LatLng,
  Place,
  PlaceData,
  PlaceDetailsResponse,
  PlaceInputType,
} from '@googlemaps/google-maps-services-js'
enum PlaceType {
  administrative_area_level_1 = 'administrative_area_level_1',
  administrative_area_level_2 = 'administrative_area_level_2',
}

const getSearchResults = async (query: string): Promise<Array<NewLocation>> => {
  const client = new Client({})
  try {
    const textSearch = await client.textSearch({
      params: {
        key: process.env.GOOGLE_MAPS_API_KEY || '',
        query,
        region: 'us',
        location: [40.73423383278248, -73.990000682489714] as LatLng,
        radius: 3500, //Find exact radius from bounding box of map
      },
    })
    console.log(textSearch.data.results, 'textSearch.data.results')

    const req = textSearch.data.results.map(
      (result: Partial<PlaceData>, i: number) => {
        const { place_id, types } = result

        if (
          place_id &&
          (!types?.includes(AddressType.administrative_area_level_1) ||
            !types?.includes(AddressType.administrative_area_level_2) ||
            !types?.includes(AddressType.administrative_area_level_3) ||
            !types?.includes(AddressType.administrative_area_level_4) ||
            !types?.includes(AddressType.administrative_area_level_5))
        ) {
          return client.placeDetails({
            params: {
              key: process.env.GOOGLE_MAPS_API_KEY || '',
              place_id,
              fields: [
                'place_id',
                'name',
                'formatted_address',
                'geometry',
                'address_components',
                'photos',
              ],
            },
          })
        }
      }
    )
    const responses = await Promise.all(req)
    const mappedFeatures = responses
      ?.map((resp: PlaceDetailsResponse | undefined) => {
        const result = resp?.data.result
        if (!result) return
        const {
          place_id: id,
          name,
          formatted_address,
          geometry,
          address_components,
          photos,
        } = result

        const locality =
          address_components?.find((component: AddressComponent) => {
            if (
              (component && component.long_name === zLocality.Enum.Brooklyn) ||
              component.long_name === zLocality.Enum.Manhattan ||
              component.long_name === zLocality.Enum.Queens ||
              component.long_name === zLocality.Enum.Bronx ||
              component.long_name === zLocality.Enum['Staten Island']
            )
              return true
          })?.long_name || zLocality.Enum.Unknown

        console.log(locality, 'locality')

        return {
          ParsedFeature: {
            feature_id: id || '',
            name,
            address: formatted_address,
            locality: (locality as Locality) || zLocality.Enum.Unknown,
            center: [geometry?.location.lng, geometry?.location.lat],
          },
          Feature: {
            id: id || '',
            type: '',
            geometry: {
              coordinates: [geometry?.location.lng, geometry?.location.lat],
              type: 'Point',
            },
            place_type: [''],
          },
        } as NewLocation
      })
      .reduce(
        (
          previousValue: NewLocation[],
          currentValue: NewLocation | undefined
        ) => {
          if (currentValue) return [...previousValue, currentValue]
          return previousValue
        },
        []
      )

    return mappedFeatures || <NewLocation[]>[]
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
