import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { Database } from '../constants/types'

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  const supabase = createServerSupabaseClient<Database>({
    req,
    res,
  })
  return {
    req,
    res,
    supabase,
  }
}
export type TRPCContext = inferAsyncReturnType<typeof createContext>
