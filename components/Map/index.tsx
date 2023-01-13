//import mapboxgl from 'mapbox-gl'
//import mapboxgl from 'mapbox-gl'
import mapboxgl, { MercatorCoordinate } from 'mapbox-gl'
import { useEffect, useRef, useState } from 'react'
import { useFeatures } from '../../hooks/index '
import { useGetUserLocation } from '../../hooks/useGetUserLocation'
import { useStore } from '../../store'
import { setUpData, useMapUpdate } from '../../utils/MapBox'
import { LngLat } from '../../constants/types'

const Map = () => {
  const initialLocation: LngLat = { lng: -73.990000682489714, lat: 40.73423383278248 } //useGetUserLocation()
  const currentPositionRef = useRef<LngLat>()
  const queryKeyRef = useRef<LngLat>()
  const [fetch, setFetch] = useState(false)
  const { data, refetch } = useFeatures({ currentPosition: queryKeyRef.current })
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map>()
  const featureMap = useStore((state) => state.features)
  const setMapRef = useStore((state) => state.setMapRef)
  const setShow = useStore((state) => state.setShow)
  const show = useStore((state) => state.show)
  useMapUpdate(data)
  mapboxgl.accessToken =
    'pk.eyJ1IjoidG9ueS1waXp6YSIsImEiOiJjbDltNXZ3eGE0ank0M25tdmZwaGMwY3psIn0.yxAZrLLcNHNyot9Cj4twsA'

  const getCameraLngLat = (): LngLat | undefined => {
    if (!map.current) return
    const camera = map.current.getFreeCameraOptions()
    if (!camera || !camera?.position) return

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
    queryKeyRef.current = initialLocation
    currentPositionRef.current = initialLocation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!mapContainer.current || !data) return
    if (map.current) {
      setUpData(map.current, featureMap)
      return
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-73.990000682489714, 40.73423383278248],
      //[-73.96875682489714, 40.73423383278248],
      //[location?.longitude, location?.latitude],
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
        //currentPositionRef.current = { lng: -73.990000682489714, lat: 40.73423383278248 }
      }
    })

    map.current.on('move', (e) => {
      const point = getCameraLngLat()
      if (!point || !currentPositionRef.current) return
      let d = getDistance(point, currentPositionRef.current)
      if (d >= 0.7) {
        currentPositionRef.current = point
        if (!show) setShow(true)
      }
    })

    //console.log('Distance', d)
    //console.log('Camera', currentPositionRef.current)
    //console.log('point', point)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

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
        <div className="absolute top-2 left-0 right-0 mx-auto flex justify-center">
          <button
            className="px-3 py-1 bg-blue-800 text-white font-roboto font-semibold text-sm rounded-xl"
            onClick={() => {
              queryKeyRef.current = currentPositionRef.current
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
