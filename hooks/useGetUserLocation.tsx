import { LngLat } from '../constants/types'
import { useEffect, useState } from 'react'
import getUserLocation from '../utils/userLocation'

const useGetUserLocation = (): LngLat => {
  const [location, setLocation] = useState<LngLat>({
    lng: -73.990000682489714,
    lat: 40.73423383278248,
  })
  useEffect(() => {
    getUserLocation((location: LngLat) => {
      setLocation(location)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setLocation])
  return location
}

export { useGetUserLocation, getUserLocation }
