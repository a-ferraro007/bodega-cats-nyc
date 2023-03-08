import { TRPCContext } from './context'
import { TRPCError, initTRPC } from '@trpc/server'
import superjson from 'superjson'

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
})

// Base router and procedure helpersexport const t = initTRPC.create();
export const router = t.router
export const middleware = t.middleware
export const procedure = t.procedure
