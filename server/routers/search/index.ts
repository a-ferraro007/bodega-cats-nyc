import {
  LngLat,
  NewLocation,
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

const BASE_URL = 'https://maps.googleapis.com/maps'
const TEXT_SEARCH = 'api/place/textsearch/json'
const DETAILS_SEARCH = 'api/place/details/json'
const REVERSE_GEOCODE = 'api/geocode/json'
const AUTOCOMPLETE_ADDRESS = 'api/place/autocomplete/json'
const headers = new Headers()
headers.append('Accept', 'application/json')
const REQUEST_OPTIONS = <RequestInit>{
  headers,
  method: 'GET',
  redirect: 'follow',
}

const getSearchResults = async (query: string): Promise<Array<NewLocation>> => {
  try {
    const QUERY_PARAMS = new URLSearchParams({
      key: process.env.GOOGLE_PLACES_KEY || '',
      query,
      region: 'us',
      location: '40.73423383278248,-73.990000682489714',
      radius: '3500',
    })
    const url = new URL(`${BASE_URL}/${TEXT_SEARCH}?${QUERY_PARAMS}`)
    const textSearchResp = await fetch(url, REQUEST_OPTIONS)
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
            `${BASE_URL}/${DETAILS_SEARCH}?${QUERY_PARAMS}&fields=place_id,name,formatted_address,geometry,address_components,photos`
          )

          return fetch(url, REQUEST_OPTIONS)
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
    const QUERY_PARAMS = new URLSearchParams({
      key: process.env.GOOGLE_PLACES_KEY || '',
      latlng: `${lnglat.lat},${lnglat.lng}`,
    })
    const url = new URL(`${BASE_URL}/${REVERSE_GEOCODE}?${QUERY_PARAMS}`)

    const headers = new Headers()
    headers.append('Accept', 'application/json')
    const resp = await fetch(url, REQUEST_OPTIONS)
    const { results } = await resp.json()

    return {
      feature_id: '',
      address: results[0].formatted_address,
      lnglat: {
        lng: results[0].geometry.location.lng,
        lat: results[0].geometry.location.lat,
      },
    } as SearchLocation
  } catch (error) {
    throw error
  }
}

const fetchAddressSearchResults = async (
  query: string
): Promise<Array<SearchLocation>> => {
  try {
    const QUERY_PARAMS = new URLSearchParams({
      key: process.env.GOOGLE_PLACES_KEY || '',
      input: query,
      location: '40.73423383278248,-73.990000682489714',
      radius: '35000',
      strictbounds: 'true',
    })
    const url = new URL(`${BASE_URL}/${AUTOCOMPLETE_ADDRESS}?${QUERY_PARAMS}`)

    const headers = new Headers()
    headers.append('Accept', 'application/json')
    const resp = await fetch(url, REQUEST_OPTIONS)
    const { predictions } = await resp.json()
    const detailsReqs: Promise<Response>[] = predictions.map(
      (prediction: any) => {
        const { structured_formatting, place_id } = prediction
        console.log('result', structured_formatting)
        const QUERY_PARAMS = new URLSearchParams({
          key: process.env.GOOGLE_PLACES_KEY || '',
          place_id,
        })
        const url = new URL(
          `${BASE_URL}/${DETAILS_SEARCH}?${QUERY_PARAMS}&fields=geometry,formatted_address`
        )
        return fetch(url, REQUEST_OPTIONS)
      }
    )
    const detailsJson = (await Promise.all(detailsReqs)).map((resp) =>
      resp.json()
    )
    const details = await Promise.all(detailsJson)
    const mappedFeatures: Array<SearchLocation> = details.map((detail: any) => {
      const {
        result: { geometry, formatted_address },
      } = detail

      return <SearchLocation>{
        feature_id: '',
        address: formatted_address,
        lnglat: {
          lng: geometry.location.lng,
          lat: geometry.location.lat,
        } as LngLat,
      }
    })

    console.log('mappedFeaturess', mappedFeatures)
    return mappedFeatures
  } catch (error) {
    throw error
  }
}

export { getSearchResults, getLngLatResults, fetchAddressSearchResults }
