import type { NextPage } from 'next'
import Head from 'next/head'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { useEffect, useState } from 'react'
import { useAddressSearchStore, useAuthStore, useStore } from '../store'
import Map from '../components/Map'
import AddressSearch from '../components/AddressSearch'
import MapIcon from '../svg/MapIcon'
import SideBar from '../components/SideBar'
import { useGetUserLocation } from '../hooks/useGetUserLocation'
import { SearchLocation } from '../constants/types'
import { trpc } from '../utils/trpc'
import Login from '../svg/Login'
import Lines from '../svg/Lines'
import CatFace from '../svg/CatFace'
import { useUser, useSessionContext } from '@supabase/auth-helpers-react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'

const Home: NextPage = ({}) => {
  const user = useUser()
  const lnglat = useGetUserLocation()
  const { supabaseClient } = useSessionContext()
  const { authStatus, setAuthStatus } = useAuthStore((state) => state)
  const showMobileMap = useStore((state) => state.showMobileMap)
  const setShowMobileMap = useStore((state) => state.setShowMobileMap)
  const { setSearchLocationState, searchLocationState } = useAddressSearchStore(
    (state) => state
  )
  const { data } = trpc.searchByLngLat.useQuery(lnglat, {
    enabled: !!lnglat,
  })

  useEffect(() => {
    if (lnglat && data) {
      const location: SearchLocation = {
        feature_id: data.feature_id,
        lnglat,
        address: data.address,
      }
      setSearchLocationState(location)
    }
  }, [setSearchLocationState, data, lnglat])

  const handleProfileClick = () => {
    console.log('profile clicked', user, supabaseClient, authStatus)
  }
  return (
    <>
      <Head>
        <title>City Cats of NYC</title>
        <meta name="description" content="Generated by create next app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1 user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative h-full w-screen overflow-hidden">
        <nav className="flex h-[70px] w-full items-center justify-between gap-4 border-b-[.5px] border-solid border-[rgba(0,0,0,.2)] bg-white p-4 md:h-20 md:gap-14 md:p-6">
          <h1 className="font-baloo text-lg font-bold leading-none text-primaryGold md:text-2xl">
            Bodega <br /> Cats
            <span className="font-baloo text-xs font-bold italic leading-none text-graphite md:text-sm">
              of nyc
            </span>
          </h1>
          <AddressSearch />
          <button
            className="rounded-[10px] bg-[#f5f4f1] p-2 md:p-3"
            onClick={() => handleProfileClick()}
          >
            <Login classNames="-translate-y-[.115rem] md:translate-y-0" />
          </button>
        </nav>

        <div className="relative flex h-container flex-row">
          <div className="flex w-full justify-center md:w-map-container">
            {searchLocationState.lnglat && <Map {...searchLocationState} />}{' '}
            {!searchLocationState.lnglat && (
              <CatFace
                classNames={`self-center mt-6 animate-bounce static z-10`}
              />
            )}
          </div>
          <SideBar />
          <button
            className={`absolute bottom-20 right-10 z-20 block rounded-full ${
              false ? 'bg-dark-blue-radial-gradient' : 'bg-graphite'
            }  b p-4 text-white md:hidden`}
            onClick={() => setShowMobileMap(!showMobileMap)}
          >
            {showMobileMap && <MapIcon />}
            {!showMobileMap && <Lines />}
          </button>
        </div>
        {!user && !authStatus && (
          <div className="absolute left-0 right-0 top-40 mx-auto  max-w-xs rounded-md bg-white p-4 shadow-[0_6px_30px_-10px]">
            <button
              className="w-full text-right font-baloo font-medium"
              onClick={() => setAuthStatus(true)}
            >
              {' '}
              close
            </button>
            <p className="text-center font-baloo text-lg font-bold">
              {' '}
              log in with Google to add a new cat{' '}
            </p>
            <Auth
              redirectTo="http://localhost:3000/"
              appearance={{ theme: ThemeSupa }}
              supabaseClient={supabaseClient}
              providers={['google']}
              socialLayout="horizontal"
              onlyThirdPartyProviders={true}
            />
          </div>
        )}
      </main>

      <footer></footer>
    </>
  )
}

export default Home
