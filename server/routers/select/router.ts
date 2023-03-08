import { z } from 'zod'
import { getFeatures, getTopInArea } from '.'
import { zLngLat } from '../../../constants/types'
import { procedure, router, middleware } from '../../trpc'

export const selectRouter = router({
  selectFeatures: procedure.input(zLngLat).query(({ input, ctx }) => {
    return getFeatures(input, ctx.supabase)
  }),
  selectTopInArea: procedure.input(z.string()).query(({ input, ctx }) => {
    return getTopInArea(input, ctx.supabase)
  }),
})
