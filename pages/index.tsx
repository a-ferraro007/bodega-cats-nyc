import type { NextPage } from 'next'
import Head from 'next/head'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { useEffect } from 'react'
import { useAddressSearchStore, useStore } from '../store'
import Map from '../components/Map'
import AddressSearch from '../components/AddressSearch'
import MapIcon from '../svg/MapIcon'
import SearchIcon from '../svg/SearchIcon'
import FeatureList from '../components/SideBar'
import { useGetUserLocation } from '../hooks/useGetUserLocation'
import { SearchLocation } from '../constants/types'
import { trpc } from '../utils/trpc'
import Login from '../svg/Login'

const Home: NextPage = ({}) => {
  const mapRef = useStore((state) => state.mapRef)
  const showMobileMap = useStore((state) => state.showMobileMap)
  const setShowMobileMap = useStore((state) => state.setShowMobileMap)
  const setSearchLocationState = useAddressSearchStore((state) => state.setSearchLocationState)
  const searchLocationState = useAddressSearchStore((state) => state.searchLocationState)
  const lnglat = useGetUserLocation()
  const { data } = trpc.searchByLngLat.useQuery(lnglat, {
    enabled: !!lnglat
  })

  useEffect(() => {
    if (lnglat && data) {
      const location: SearchLocation = {
        lnglat,
        address: data.address
      }
      setSearchLocationState(location)
    }
  }, [setSearchLocationState, data, lnglat])

  return (
    <>
      <Head>
        <title>Bodega Cats</title>
        <meta name="description" content="Generated by create next app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1 user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-screen overflow-hidden relative">
        <nav className="flex w-full h-[70px] md:h-20 bg-white justify-between items-center border-solid border-b-[.5px] border-[rgba(0,0,0,.2)] p-4 gap-4 md:p-6 md:gap-14">
          <h1 className="text-lg md:text-2xl font-baloo text-primaryGold font-bold leading-none">
            Bodega <br /> Cats
            <span className="text-xs md:text-sm font-baloo text-graphite italic font-bold leading-none">
              of nyc
            </span>
          </h1>
          <AddressSearch />
          <button
            className="bg-[#f5f4f1] p-2 rounded-[10px]"
            onClick={() => {
              const coord = mapRef.getCenter()
              console.log(mapRef)
            }}
          >
            <Login classNames="-translate-y-[.2rem]" />
          </button>
        </nav>

        <div className="h-container flex flex-row relative">
          <div className="w-full md:w-map-container">
            {searchLocationState.lnglat && <Map {...searchLocationState} />}
          </div>
          <FeatureList />
          <button
            className="block md:hidden absolute bottom-20 right-10 bg-primaryBlue text-white p-4 rounded-full z-20"
            onClick={() => {
              console.log(showMobileMap)
              setShowMobileMap(!showMobileMap)
            }}
          >
            {showMobileMap && <MapIcon />}
            {!showMobileMap && <SearchIcon />}
          </button>
        </div>
      </main>

      <footer></footer>
    </>
  )
}

export default Home

//const [_, setAuth] = useState(false)
//const user = useUser()
//const { supabaseClient } = useSessionContext()
//const authState = useStore((state) => state.authState)
