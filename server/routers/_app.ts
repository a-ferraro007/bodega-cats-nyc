import { router } from '../trpc'
import { insertRouter } from './insert/router'
import { selectRouter } from './select/router'
import { searchRouter } from './search/router'

export const appRouter = router({
  search: searchRouter,
  select: selectRouter,
  insert: insertRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
