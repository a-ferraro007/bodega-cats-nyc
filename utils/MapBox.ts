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
  const featureStateMap = useStore((state) => state.features)
  const updateMapState = useStore((state) => state.updateMapState)

  useEffect(() => {
    const { features } = geo_json
    if (!features) return
    if (featureStateMap.size === 0) {
      features.forEach((feature: any) => {
        const marker = newMarker(feature, true, feature.properties.image)
        featureStateMap.set(feature.id, marker)
      })
      updateMapState(featureStateMap)
      return
    }

    const fetchedFeaturesMap = new Map()
    features.forEach((feature: any) => {
      fetchedFeaturesMap.set(feature.id, feature)
    })

    featureStateMap.forEach((_: any, key: any) => {
      if (!fetchedFeaturesMap.has(key)) {
        const marker = featureStateMap.get(key)
        featureStateMap.delete(key)
        marker.remove()
      } else {
        fetchedFeaturesMap.forEach((feature, key) => {
          if (featureStateMap.has(key)) return
          const marker = newMarker(feature, true, feature.properties.image)
          featureStateMap.set(feature.id, marker)
        })
      }
    })
    updateMapState(featureStateMap)
    // //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featureStateMap, geo_json, updateMapState])
}

export { setUpData as setUpData, createAddressString, useMapUpdate }
