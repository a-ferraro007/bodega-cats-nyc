import { SupabaseClient } from '@supabase/supabase-js'
import { FeatureInterface, Feature, LngLat } from '../../../constants/types'
import { selectFromFeature, selectTopInArea } from '../../supabase/db'

const getTopInArea = async (borough: string, supabase: SupabaseClient) => {
  return await selectTopInArea(borough, supabase)
}

const DEG2RAD = Math.PI / 180
const RAD2DEG = 180 / Math.PI
const FULL_CIRCLE_RAD = Math.PI * 2

const getFeatures = async (
  currentPosition: LngLat,
  supabase: any
): Promise<FeatureInterface[]> => {
  try {
    const data = await selectFromFeature(supabase)
    return filterByLngLat(data, currentPosition)
  } catch (error) {
    console.error(error)
    throw error
  }
}

const filterByLngLat = (
  data: FeatureInterface[],
  lnglat: LngLat
): FeatureInterface[] => {
  const bounds = getBoundingCoordinates(2, lnglat)
  const min = bounds[0] //min[0] == lat, min[1] == lng
  const max = bounds[1]

  const validFeatures = data
    .filter((feature: Feature) => {
      const coordinates =
        feature.MapBox_Feature[0].geo_json.geometry.coordinates
      const lng = coordinates[0]
      const lat = coordinates[1]

      if (lng >= min[1] && lng <= max[1] && lat >= min[0] && lng <= max[0]) {
        return feature
      }
    })
    .map((feature: Feature) => feature)

  return validFeatures.length > 0 ? validFeatures : []
}

const getBoundingCoordinates = (distance: number, lnglat: any) => {
  const radius = 3963.19 //EARTH RADIUS IN MILES
  let MAX_LNG = Math.PI
  let MAX_LAT = Math.PI / 2
  let MIN_LNG = -MAX_LNG
  let MIN_LAT = -MAX_LAT
  let maxLng, minLng, minLat, maxLat
  let { lng, lat } = lnglat

  if (distance <= 0) {
    console.error('Invalid Distance or Radius')
  }

  lng = lng * DEG2RAD
  lat = lat * DEG2RAD

  //angular distance in radians
  const radDist = distance / radius
  minLat = lat - radDist
  maxLat = lat + radDist

  if (minLat >= MIN_LAT && maxLat <= MAX_LAT) {
    const deltaLng = Math.asin(Math.sin(radDist) / Math.cos(lat))

    minLng = lng - deltaLng
    maxLng = lng + deltaLng
    if (minLng < MIN_LNG) minLng += FULL_CIRCLE_RAD
    if (maxLng > MAX_LNG) maxLng -= FULL_CIRCLE_RAD
  } else {
    minLat = Math.max(minLat, MIN_LAT)
    maxLat = Math.min(maxLat, MAX_LAT)
    minLng = MIN_LNG
    maxLng = MAX_LNG
  }

  return [
    [minLat * RAD2DEG, minLng * RAD2DEG],
    [maxLat * RAD2DEG, maxLng * RAD2DEG],
  ]
}

export { getTopInArea, getFeatures }
