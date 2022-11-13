import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { useSessionContext } from '@supabase/auth-helpers-react'
import mapboxgl from 'mapbox-gl'
import { useEffect, useRef } from 'react'
import { useStore } from '../../store'
import { createAddressString, setUpData, useMapUpdate } from '../../utils/MapBox'
import { newMarker } from '../../utils/MapMarker'

const Map = ({ geo_json, addBtn, setAddBtn, setAuth }: any) => {
  const { session } = useSessionContext()
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map>()
  const marker = useRef<mapboxgl.Marker>()
  const featureMap = useStore((state) => state.featureMap)
  const drawerState = useStore((state) => state.drawerState)
  const setDrawerStateStore = useStore((state) => state.setDrawerState)
  const isDrawerOpen = useStore((state) => state.isDrawerOpen)
  const setDrawerOpen = useStore((state) => state.setDrawerOpen)
  useMapUpdate(geo_json)

  mapboxgl.accessToken =
    'pk.eyJ1IjoidG9ueS1waXp6YSIsImEiOiJjbDltNXZ3eGE0ank0M25tdmZwaGMwY3psIn0.yxAZrLLcNHNyot9Cj4twsA'

  const setUpGeoCoder = (map: mapboxgl.Map) => {
    const geo = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      bbox: [-74.25909, 40.477399, -73.700272, 40.917577],
      marker: false,
      filter: (feature) => {
        return feature.place_type.includes('poi')
      }
    })

    map.addControl(geo)

    geo.on('result', ({ result: feature }) => {
      console.log('RESULT', feature)

      if (marker.current) marker.current.remove()
      marker.current = newMarker(feature)
      marker.current.addTo(map)

      const { id, type, geometry, place_name, place_type, center, context, text, properties } =
        feature

      if (!properties.address) return
      const address = createAddressString(properties.address, context)

      setDrawerStateStore({
        LocationData: {
          feature_id: id,
          name: text,
          center,
          address,
          locality: context[2]?.text
        },
        FeatureData: {
          id,
          type,
          geometry,
          place_type
        }
      })
      setAddBtn(true)
      console.log(marker)
    })

    geo.on('clear', () => {
      marker.current?.remove()
      setDrawerOpen(false)
      setAddBtn(false)
    })

    geo.on('loading', () => setDrawerOpen(false))
  }

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
      maxBounds: [-74.25909, 40.477399, -73.700272, 40.917577],
      interactive: true
    })

    map.current.on('load', () => {
      if (map.current && map && geo_json) {
        console.log('GEO', geo_json)
        map.current.addSource('unclustered-bodega-cats', {
          type: 'geojson',
          data: geo_json
        })
        setUpData(map.current, featureMap)
        setUpGeoCoder(map.current)
      }
    })
  })

  const HandleAddBtn = () => {
    if (session && drawerState?.LocationData && drawerState?.FeatureData) {
      setDrawerOpen(true)
      setAddBtn(!addBtn)
    } else {
      setAuth(true)
    }
  }

  return (
    <div className="relative mt-4 md:mt-6 bodega-cats" ref={mapContainer}>
      {addBtn && (
        <button
          className="absolute top-14 right-4 z-10 text-xl font-baloo font-bold px-3 py-1 rounded-md bg-white shadow-[0_6px_30px_-10px]"
          onClick={() => HandleAddBtn()}
        >
          add cat
        </button>
      )}
    </div>
  )
}

export default Map
