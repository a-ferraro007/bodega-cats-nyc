import {
  LngLat,
  NewLocation,
  ParsedAddressFeature,
  ParsedSearchLocation,
  SearchLocation,
  AddressComponent,
  Locality,
  PlaceDetailResult,
  PlaceResult,
  PlaceType,
  TextSearchResult,
  zLocality,
} from '../../../constants/types'

const BASE_URL = 'https://maps.googleapis.com/maps/api/place'
const TEXT_SEARCH = 'textsearch/json'
const DETAILS = 'details/json'

const getSearchResults = async (query: string): Promise<Array<NewLocation>> => {
  try {
    const QUERY_PARAMS = new URLSearchParams({
      key: process.env.GOOGLE_PLACES_KEY || '',
      query,
      region: 'us',
      location: '40.73423383278248 -73.990000682489714',
      radius: '3500',
    })
    const url = new URL(`${BASE_URL}/${TEXT_SEARCH}?${QUERY_PARAMS}`)

    const headers = new Headers()
    headers.append('Accept', 'application/json')
    const textSearchResp = await fetch(url, {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
    })
    const textSearchJson = (await textSearchResp.json()) as TextSearchResult

    const req = textSearchJson.results.map(
      (result: PlaceResult, i: number): Promise<Response> | undefined => {
        const { place_id, types } = result

        if (
          place_id &&
          (!types?.includes(PlaceType.ADMINISTRATIVE_AREA_LEVEL_1) ||
            !types?.includes(PlaceType.ADMINISTRATIVE_AREA_LEVEL_1) ||
            !types?.includes(PlaceType.ADMINISTRATIVE_AREA_LEVEL_1) ||
            !types?.includes(PlaceType.ADMINISTRATIVE_AREA_LEVEL_1) ||
            !types?.includes(PlaceType.ADMINISTRATIVE_AREA_LEVEL_1))
        ) {
          const QUERY_PARAMS = new URLSearchParams({
            key: process.env.GOOGLE_PLACES_KEY || '',
            place_id,
          })
          const url = new URL(
            `${BASE_URL}/${DETAILS}?${QUERY_PARAMS}&fields=place_id,name,formatted_address,geometry,address_components,photos`
          )
          console.log(url, 'url')

          return fetch(url, {
            method: 'GET',
            headers: headers,
            redirect: 'follow',
          })
        }
      }
    )

    const responses = (await Promise.all(req)).map(
      (resp) => resp?.json() as Promise<PlaceDetailResult>
    )
    const json = await Promise.all(responses)

    const mappedFeatures = json
      .map(({ result: PlaceDetail }: PlaceDetailResult) => {
        const {
          place_id: id,
          name,
          formatted_address,
          geometry,
          address_components,
        } = PlaceDetail

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

        return {
          ParsedFeature: {
            feature_id: id || '',
            name,
            address: formatted_address,
            locality: (locality as Locality) || zLocality.Enum.Unknown,
            center: [geometry?.location?.lng, geometry?.location?.lat],
          },
          Feature: {
            id: id || '',
            type: '',
            geometry: {
              coordinates: [geometry?.location?.lng, geometry?.location?.lat],
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
