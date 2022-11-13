import { useQuery } from '@tanstack/react-query'
import supabase from '../../supabase'

const fetchFeatures = async () => {
  try {
    const { data, error } = await supabase.from('MapBox_Feature').select('geo_json')
    if (error) throw error

    return {
      type: 'FeatureCollection',
      features: data.map((e) => e.geo_json)
    }
  } catch (error) {
    console.log('Error Fetching FeatureCollection Geo_JSON', error)
    return error
  }
}

const useFeatures = () => {
  return useQuery(['features'], () => fetchFeatures())
}

export { useFeatures, fetchFeatures }
