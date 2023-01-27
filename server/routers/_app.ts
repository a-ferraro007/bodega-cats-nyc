import { z } from 'zod'
import { procedure, router } from '../trpc'
import { zLngLat, LngLat, ParsedSearchLocation } from './../../constants/types'
import {
  fetchFeatures,
  fetchSearchResults,
  fetchLngLatResults,
  fetchAddressSearchResults
} from '../../hooks'

export const appRouter = router({
  selectFeatures: procedure.input(zLngLat).query(({ input }) => {
    return fetchFeatures(input)
  }),
  searchByAddress: procedure
    .input(z.string())
    .query(({ input }) => fetchAddressSearchResults(input)),
  searchByLngLat: procedure.input(zLngLat).query(({ input }) => {
    if (!input) return <ParsedSearchLocation>{}
    return fetchLngLatResults(input)
  }),
  searchByPlace: procedure.input(z.string()).query(({ input }) => fetchSearchResults(input))
})

// export type definition of API
export type AppRouter = typeof appRouter
