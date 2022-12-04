import mapboxgl from 'mapbox-gl'
import { useEffect, useRef, useState } from 'react'
import { useStore } from '../../store'
import { setUpData, useMapUpdate } from '../../utils/MapBox'

const Map = ({ geo_json }: any) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map>()
  const [_, setLocation] = useState<GeolocationCoordinates>()
  const featureMap = useStore((state) => state.features)
  const setMapRef = useStore((state) => state.setMapRef)
  const { featureDrawerIsActive, searchDrawerIsActive } = useStore((state) => state.drawerState)
  useMapUpdate(geo_json)
  mapboxgl.accessToken =
    'pk.eyJ1IjoidG9ueS1waXp6YSIsImEiOiJjbDltNXZ3eGE0ank0M25tdmZwaGMwY3psIn0.yxAZrLLcNHNyot9Cj4twsA'

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('POS', position)
          if (position) setLocation(position.coords)
        },
        (e) => {
          console.error('Error  retrieving location', e)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000
        }
      )
    }
    return null
  }

  useEffect(() => {
    getUserLocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!mapContainer.current) return
    if (map.current) {
      setUpData(map.current, featureMap)
      return
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-73.96875682489714, 40.73423383278248], //[location?.longitude, location?.latitude],
      zoom: 14,
      maxBounds: [-74.26379, 40.3923, -73.667498, 40.94285], //[-74.25909, 40.477399, -73.700272, 40.917577],
      interactive: true
    })
    setMapRef(map.current)

    map.current.on('load', () => {
      if (map.current && map && geo_json) {
        console.log('GEO', geo_json)
        map.current.addSource('unclustered-bodega-cats', {
          type: 'geojson',
          data: geo_json
        })
        setUpData(map.current, featureMap)
      }
    })
  })

  useEffect(() => {
    console.log('RESIZE')

    let resizeInterval = setInterval(() => {
      if (map.current) {
        map.current.resize()
      }
    })
    let timeoutHandler = setTimeout(() => {
      clearInterval(resizeInterval)
    }, 300)

    return () => {
      if (timeoutHandler) {
        clearTimeout(timeoutHandler)
      }
    }
  }, [featureDrawerIsActive, searchDrawerIsActive, map])

  return <div className="bodega-cats h-full" ref={mapContainer}></div>
}

export default Map
