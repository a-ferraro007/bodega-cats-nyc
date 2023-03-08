import { newLocation } from '.'
import { zNewFeatureMutation } from '../../../constants/types'
import { procedure, router } from '../../trpc'

export const insertRouter = router({
  newLocation: procedure
    .input(zNewFeatureMutation)
    .mutation(({ input, ctx }) => {
      return newLocation(input, ctx.supabase)
    }),
})
