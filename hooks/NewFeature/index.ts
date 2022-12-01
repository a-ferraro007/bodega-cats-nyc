import { NewFeatureMutation } from './../../constants/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import supabase from '../../supabase'
//{ uuid, name, rating, image, geo_json, address, locality }: any,
const newFeature = async ({ CatProperties, MapBoxFeature }: NewFeatureMutation) => {
  try {
    const { data: insertCatResp, error: insertCatError } = await supabase
      .from('Cat_Properties')
      .insert(CatProperties)
      .select('id')

    if (insertCatError) throw insertCatError
    if (!insertCatResp.length) throw new Error('Error Inserting new Feature: No cat_id return ')
    const { data, error } = await supabase
      .from('MapBox_Feature')
      .insert({ ...MapBoxFeature, cat_id: insertCatResp[0].id })
    if (error) throw error
    console.log('MUTATION RESPONSE: ', data)
  } catch (error) {
    console.error('Error Fetching FeatureCollection Geo_JSON', error)
    return error
  }
}

const useNewFeatureMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: newFeature,
    onSuccess: () => {
      console.log('ON SUCCESS')
      return queryClient.invalidateQueries(['features'])
    }
  })
}

export default useNewFeatureMutation
