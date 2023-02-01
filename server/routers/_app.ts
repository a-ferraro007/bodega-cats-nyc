import { z } from 'zod'
import { procedure, router } from '../trpc'
import { zLngLat, LngLat, ParsedSearchLocation } from './../../constants/types'
import {
  getFeatures,
  getSearchResults,
  getLngLatResults,
  fetchAddressSearchResults,
  getTopInArea
} from '../../hooks'

export const appRouter = router({
  selectFeatures: procedure.input(zLngLat).query(({ input }) => {
    return getFeatures(input)
  }),
  selectTopInArea: procedure.input(z.string()).query(({ input }) => {
    return getTopInArea(input)
  }),
  searchByAddress: procedure
    .input(z.string())
    .query(({ input }) => fetchAddressSearchResults(input)),
  searchByLngLat: procedure.input(zLngLat).query(({ input }) => {
    if (!input) return <ParsedSearchLocation>{}
    return getLngLatResults(input)
  }),
  searchByPlace: procedure.input(z.string()).query(({ input }) => getSearchResults(input))
})

// export type definition of API
export type AppRouter = typeof appRouter
