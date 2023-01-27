import mapboxgl, { MercatorCoordinate } from 'mapbox-gl'
import { useEffect, useRef, useState } from 'react'
import { useMapUpdate } from '../../hooks'
import { useStore } from '../../store'
import { setUpData } from '../../utils/MapBox'
import { LngLat, SearchLocation } from '../../constants/types'
import { trpc } from '../../utils/trpc'

interface UserLocation {
  lnglat: LngLat
  address: string
}
const Map = ({ lnglat, address }: SearchLocation) => {
  const defaultLoc: LngLat = { lng: -73.990000682489714, lat: 40.73423383278248 }
  const searchLocationState = useStore((state) => state.searchLocationState)
  const currentPositionRef = useRef<LngLat>(searchLocationState.lnglat)
  const queryKeyRef = useRef<LngLat>(lnglat) //{ lng: -73.990000682489714, lat: 40.73423383278248 })
  console.log(queryKeyRef.current)

  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map>()
  const featureMap = useStore((state) => state.features)
  const setMapRef = useStore((state) => state.setMapRef)
  const setShow = useStore((state) => state.setShow)
  const show = useStore((state) => state.show)
  const { data, refetch } = trpc.selectFeatures.useQuery(queryKeyRef.current, { enabled: true })
  useMapUpdate(data)

  mapboxgl.accessToken =
    'pk.eyJ1IjoidG9ueS1waXp6YSIsImEiOiJjbDltNXZ3eGE0ank0M25tdmZwaGMwY3psIn0.yxAZrLLcNHNyot9Cj4twsA'

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
      lat: point.lat
    } as LngLat
  }

  useEffect(() => {
    console.log({ queryKeyRef })
    refetch()
  })

  useEffect(() => {
    //if (queryKeyRef.current === undefined) {
    //  queryKeyRef.current = searchLocationState.lnglat
    //}
    if (currentPositionRef.current === undefined) {
      currentPositionRef.current = searchLocationState.lnglat
    }
  }, [searchLocationState])

  useEffect(() => {
    console.log({ data })
    if (!mapContainer.current || !data || !currentPositionRef.current) return
    if (map.current) {
      setUpData(map.current, featureMap)
      return
    }
    console.log('AFTER GEO')
    //[initialLocation.lng, initialLocation.lat], //
    map.current = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [currentPositionRef.current?.lng, currentPositionRef.current?.lat],
      zoom: 14,
      //minZoom: 10,
      maxBounds: [-74.26379, 40.3923, -73.667498, 40.94285],
      //[-74.25909, 40.477399, -73.700272, 40.917577]
      interactive: true
    })
    setMapRef(map.current)

    //[-74.26379, 40.3923, -73.667498, 40.94285], [-74.25909, 40.477399, -73.700272, 40.917577],
    //[-74.04728, 40.68392], //[lng, lat]
    //[-73.91058, 40.87764]

    map.current.on('load', () => {
      if (map.current && map && data) {
        console.log('GEO', data)
        map.current.addSource('unclustered-bodega-cats', {
          type: 'geojson',
          data: data as any
        })
        setUpData(map.current, featureMap)
      }
    })

    map.current.on('move', (e) => {
      const point = getCameraLngLat()
      if (!point || !currentPositionRef.current) return
      let d = getDistance(point, currentPositionRef.current)
      if (d >= 0.7) {
        currentPositionRef.current = point
        if (!show) setShow(true)
        console.log(currentPositionRef.current)
      }
    })
  }, [data, currentPositionRef, setMapRef, featureMap, show, setShow])

  //useEffect(() => {
  //  console.log('RESIZE')

  //  let resizeInterval = setInterval(() => {
  //    if (map.current) {
  //      map.current.resize()
  //    }
  //  })
  //  let timeoutHandler = setTimeout(() => {
  //    clearInterval(resizeInterval)
  //  }, 300)

  //  return () => {
  //    if (timeoutHandler) {
  //      clearTimeout(timeoutHandler)
  //    }
  //  }
  //}, [featureDrawerIsActive, searchDrawerIsActive, map])

  return (
    <>
      <div className="bodega-cats h-full w-full relative" ref={mapContainer}></div>
      {show && (
        <div className="absolute top-4 left-6 mx-auto flex justify-center">
          <button
            className="h-10 w-48 bg-blue-800 text-white font-roboto font-normal text-sm rounded-full"
            onClick={() => {
              queryKeyRef.current = currentPositionRef.current
              console.log({ qk: queryKeyRef.current }, { cp: currentPositionRef.current })

              refetch()
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
//console.log({ queryKEy: queryKeyRef.current }, { currentPosition })
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
      Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng1 - lng2)
    ) * radius
  )
}

export default Map
