import mapboxgl, { MercatorCoordinate } from 'mapbox-gl'
import { useEffect, useRef, useState } from 'react'
import { useLoadingDebounce, useMapUpdate } from '../hooks'
import { useAddressSearchStore, useFeatureStore, useStore } from '../store'
import { setUpData } from '../utils/MapBox'
import { LngLat, SearchLocation } from '../constants/types'
import { trpc } from '../utils/trpc'
import { returnUserLocationMarker } from '../utils/MapMarker'
import shallow from 'zustand/shallow'

mapboxgl.accessToken =
  'pk.eyJ1IjoidG9ueS1waXp6YSIsImEiOiJjbDltNXZ3eGE0ank0M25tdmZwaGMwY3psIn0.yxAZrLLcNHNyot9Cj4twsA'

const Map = ({ lnglat, address }: SearchLocation) => {
  const defaultLoc: LngLat = {
    lng: -73.990000682489714,
    lat: 40.73423383278248,
  }
  const searchLocationState = useAddressSearchStore(
    (state) => state.searchLocationState
  )
  const currentPositionRef = useRef<LngLat>(searchLocationState.lnglat)
  const userLocationMarkerRef = useRef<any>()
  const [queryKeyRef, setKey] = useState<LngLat>(lnglat) // useRef<LngLat>(lnglat) //{ lng: -73.990000682489714, lat: 40.73423383278248 })
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map>()
  const { features: featureMap, setIsLoading } = useFeatureStore(
    (state) => state,
    shallow
  )
  const setMapRef = useStore((state) => state.setMapRef)
  const setShow = useStore((state) => state.setShow)
  const show = useStore((state) => state.show)
  const { data, isLoading } = trpc.selectFeatures.useQuery(queryKeyRef, {
    enabled: true,
  })
  useMapUpdate(data)
  useLoadingDebounce(isLoading, setIsLoading, 300)

  const getCameraLngLat = (): LngLat => {
    if (!map.current) return {} as LngLat

    const camera = map.current.getFreeCameraOptions()
    if (!camera || !camera?.position) return {} as LngLat

    const point = new MercatorCoordinate(
      camera.position.x,
      camera.position.y,
      camera.position.z
    ).toLngLat()

    return {
      lng: point.lng,
      lat: point.lat,
    } as LngLat
  }

  useEffect(() => {
    if (
      map.current ??
      currentPositionRef.current !== searchLocationState.lnglat
    ) {
      currentPositionRef.current = searchLocationState.lnglat
      map.current?.setCenter(searchLocationState.lnglat)
      setKey(searchLocationState.lnglat)
    }

    if (map.current) {
      if (!userLocationMarkerRef.current) {
        userLocationMarkerRef.current = returnUserLocationMarker(
          searchLocationState.lnglat
        )
        userLocationMarkerRef.current.addTo(map.current)
      } else {
        userLocationMarkerRef.current.remove()
        userLocationMarkerRef.current = returnUserLocationMarker(
          searchLocationState.lnglat
        )
        userLocationMarkerRef.current.addTo(map.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchLocationState, map.current])

  useEffect(() => {
    if (!mapContainer.current || !data || !currentPositionRef.current) return
    if (map.current) {
      setUpData(map.current, featureMap)
      return
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [
        currentPositionRef.current?.lng,
        currentPositionRef.current?.lat,
      ],
      zoom: 14,
      maxBounds: [-74.26379, 40.3923, -73.667498, 40.94285],
      interactive: true,
    })
    setMapRef(map.current)

    map.current.on('load', () => {
      if (map.current && map && data) {
        //console.log('GEO', data)
        map.current.addSource('unclustered-bodega-cats', {
          type: 'geojson',
          data: data as any,
        })
        setUpData(map.current, featureMap)
      }
    })

    map.current.on('move', (e) => {
      const point = getCameraLngLat()
      if (!point || !currentPositionRef.current) return
      let d = getDistance(point, currentPositionRef.current)
      if (d >= 0.5) {
        currentPositionRef.current = point
        if (!show) setShow(true)
      }
    })
  }, [data, currentPositionRef, setMapRef, featureMap, show, setShow])

  return (
    <>
      <div
        className="bodega-cats relative h-full w-full"
        ref={mapContainer}
      ></div>
      {show && (
        <div className="absolute top-4 left-6 mx-auto flex justify-center">
          <button
            className="h-10 w-48 rounded-full bg-blue-800 font-roboto text-sm font-normal text-white transition-all duration-300  hover:scale-[1.03] hover:shadow-md"
            onClick={() => {
              setKey(currentPositionRef.current)
              setShow(false)
            }}
          >
            search this area
          </button>
        </div>
      )}
    </>
  )
}

const getDistance = (lngLat1: LngLat, lngLat2: LngLat): number => {
  const DEG2RAD = Math.PI / 180
  const radius = 3963.19 //EARTH RADIUS IN MILES
  let { lng: lng1, lat: lat1 } = lngLat1
  let { lng: lng2, lat: lat2 } = lngLat2

  lng1 = lng1 * DEG2RAD
  lat1 = lat1 * DEG2RAD

  lng2 = lng2 * DEG2RAD
  lat2 = lat2 * DEG2RAD

  return (
    Math.acos(
      Math.sin(lat1) * Math.sin(lat2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng1 - lng2)
    ) * radius
  )
}

export default Map
