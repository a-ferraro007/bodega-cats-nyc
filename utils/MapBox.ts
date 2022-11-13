import mapboxgl from 'mapbox-gl'
import { newMarker } from './MapMarker'
import { useStore } from '../store'
import { useEffect } from 'react'

const setUpData = (map: mapboxgl.Map, featureMap: any) => {
  featureMap.forEach((feature: any, key: any) => {
    feature.addTo(map)
  })
}

const createAddressString = (propertyAddress: string, context: any) => {
  if (propertyAddress) {
    return propertyAddress + ', ' + context[3]?.text + ', ' + context[5]?.text
  } else {
    return context[3]?.text + ', ' + context[5]?.text
  }
}

const useMapUpdate = (geo_json: any) => {
  const featureMap = useStore((state) => state.featureMap)
  const updateMapState = useStore((state) => state.updateMapState)

  useEffect(() => {
    const { features } = geo_json
    if (!features) return
    if (featureMap.size === 0) {
      features.forEach((feature: any) => {
        const marker = newMarker(feature, feature.properties.image)
        featureMap.set(feature.id, marker)
      })
      updateMapState(featureMap)
      return
    }

    const newMap = new Map()
    features.forEach((feature: any) => {
      newMap.set(feature.id, feature)
    })

    featureMap.forEach((_: any, key: any) => {
      if (!newMap.has(key)) {
        const marker = featureMap.get(key)
        featureMap.delete(key)
        marker.remove()
      } else {
        newMap.forEach((feature, key) => {
          if (featureMap.has(key)) return
          const marker = newMarker(feature, feature.properties.image)
          //marker.addTo(map)
          featureMap.set(feature.id, marker)
        })
      }
    })

    updateMapState(featureMap)
    // //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featureMap, geo_json, updateMapState])
}

export { setUpData as setUpData, createAddressString, useMapUpdate }
