import { useEffect } from 'react'
import { useStore } from '../../store'
import { newMarker } from '../../utils/MapMarker'

const useMapUpdate = (data: any) => {
  const featureStateMap = useStore((state) => state.features)
  const updateMapState = useStore((state) => state.updateMapState)

  useEffect(() => {
    if (!data) return
    const { features } = data
    if (!features) return

    if (featureStateMap.size === 0) {
      features.forEach((feature: any) => {
        const marker = newMarker(feature, true, feature.properties.image)
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
              const marker = newMarker(feature, true, feature.properties.image)
              featureStateMap.set(feature.id, marker)
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
