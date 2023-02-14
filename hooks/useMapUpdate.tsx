import { useEffect } from 'react'
import { Feature, FeatureInterface, MarkerFeature } from '../constants/types'
import { useFeatureStore, useStore } from '../store'
import { returnNewMarker } from '../utils/MapMarker'

const useMapUpdate = (features: FeatureInterface[] | undefined) => {
  const { features: featureStateMap, setFeatures: updateMapState } =
    useFeatureStore((state) => state)

  useEffect(() => {
    if (!features) return

    if (featureStateMap.size === 0) {
      features.forEach((feature: Feature) => {
        const { MapBox_Feature } = feature
        const marker = returnNewMarker(feature, true, feature.image)
        featureStateMap.set(MapBox_Feature[0].feature_id, { marker, feature })
      })
    } else {
      const fetchedFeaturesMap = new Map<string, Feature>()
      features.forEach((feature: Feature) => {
        const { MapBox_Feature } = feature
        fetchedFeaturesMap.set(MapBox_Feature[0].feature_id, feature)
      })

      featureStateMap.forEach((_: MarkerFeature, key: string) => {
        if (!fetchedFeaturesMap.has(key)) {
          const marketFeature = featureStateMap.get(key)
          if (marketFeature) {
            const { marker } = marketFeature
            featureStateMap.delete(key)
            marker.remove()
          }
        } else {
          fetchedFeaturesMap.forEach((feature, key) => {
            if (!featureStateMap.has(key)) {
              const { MapBox_Feature } = feature
              const marker = returnNewMarker(feature, true, feature.image)
              featureStateMap.set(MapBox_Feature[0].feature_id, {
                marker,
                feature,
              })
            }
          })
        }
      })
    }

    updateMapState(featureStateMap)

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [features])
}

export default useMapUpdate
