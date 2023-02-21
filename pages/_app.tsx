import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { trpc } from '../utils/trpc'
import { useSetHeight } from '../hooks'
import { Layout } from '../components'

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {
  useSetHeight()
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ReactQueryDevtools />
    </SessionContextProvider>
  )
}

export default trpc.withTRPC(MyApp)
