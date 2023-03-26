import { NewLocation, SearchLocation } from './../../../constants/types'
import { z } from 'zod'
import {
  fetchAddressSearchResults,
  getLngLatResults,
  getSearchResults,
} from '.'
import { zLngLat, ParsedSearchLocation } from '../../../constants/types'
import { procedure, router } from '../../trpc'

export const searchRouter = router({
  searchByAddress: procedure.input(z.string()).query(({ input }) => {
    if (!input) return <SearchLocation[]>[]
    return fetchAddressSearchResults(input)
  }),
  searchByLngLat: procedure.input(zLngLat).query(({ input }) => {
    if (!input) return <ParsedSearchLocation>{}
    return getLngLatResults(input)
  }),
  searchByPlace: procedure.input(z.string()).query(({ input }) => {
    if (input.length <= 0) return <NewLocation[]>[]
    return getSearchResults(input)
  }),
})
