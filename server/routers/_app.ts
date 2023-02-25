import { z } from 'zod'
import { procedure, router } from '../trpc'
import {
  zLngLat,
  LngLat,
  ParsedSearchLocation,
  zNewFeatureMutation,
  NewFeatureMutation,
} from './../../constants/types'
import {
  getFeatures,
  getSearchResults,
  getLngLatResults,
  fetchAddressSearchResults,
  getTopInArea,
} from '../../hooks'
import { newFeature } from '../../hooks/NewFeature'

export const appRouter = router({
  selectFeatures: procedure.input(zLngLat).query(({ input }) => {
    return getFeatures(input)
  }),
  selectTopInArea: procedure.input(z.string()).query(({ input }) => {
    console.log('selectTopInArea', input)
    return getTopInArea(input)
  }),
  searchByAddress: procedure
    .input(z.string())
    .query(({ input }) => fetchAddressSearchResults(input)),
  searchByLngLat: procedure.input(zLngLat).query(({ input }) => {
    if (!input) return <ParsedSearchLocation>{}
    return getLngLatResults(input)
  }),
  searchByPlace: procedure
    .input(z.string())
    .query(({ input }) => getSearchResults(input)),
  addLocation: procedure.input(zNewFeatureMutation).mutation(({ input }) => {
    return newFeature(input)
  }),
})

// export type definition of API
export type AppRouter = typeof appRouter
