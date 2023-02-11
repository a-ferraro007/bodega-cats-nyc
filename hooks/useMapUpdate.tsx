import { useEffect } from 'react'
import { useFeatureStore, useStore } from '../store'
import { returnNewMarker } from '../utils/MapMarker'

const useMapUpdate = (data: any) => {
  const { features: featureStateMap, setFeatures: updateMapState } =
    useFeatureStore((state) => state)

  useEffect(() => {
    if (!data) return
    const { features } = data
    if (!features) return

    if (featureStateMap.size === 0) {
      features.forEach((feature: any) => {
        const marker = returnNewMarker(feature, true, feature.properties.image)
        featureStateMap.set(feature.id, { marker, feature })
      })
    } else {
      const fetchedFeaturesMap = new Map()
      features.forEach((feature: any) => {
        fetchedFeaturesMap.set(feature.id, feature)
      })

      featureStateMap.forEach((_: any, key: any) => {
        if (!fetchedFeaturesMap.has(key)) {
          const { marker } = featureStateMap.get(key)
          featureStateMap.delete(key)
          marker.remove()
        } else {
          fetchedFeaturesMap.forEach((feature, key) => {
            if (!featureStateMap.has(key)) {
              const marker = returnNewMarker(
                feature,
                true,
                feature.properties.image
              )
              featureStateMap.set(feature.id, { marker, feature })
            }
          })
        }
      })
    }

    updateMapState(featureStateMap)

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
}

export default useMapUpdate