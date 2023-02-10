import { LngLat } from '../constants/types'
import { useEffect, useState } from 'react'

const getUserLocation = (cb: Function) => {
  if (navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (position) {
          const { longitude: lng, latitude: lat } = position.coords
          cb({ lng, lat })
        } else
          cb(<LngLat>{
            lng: -73.990000682489714,
            lat: 40.73423383278248,
          })
      },
      (e) => {
        console.error('Error  retrieving location', e)
        cb(<LngLat>{
          lng: -73.990000682489714,
          lat: 40.73423383278248,
        })
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    )
  }
}

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
