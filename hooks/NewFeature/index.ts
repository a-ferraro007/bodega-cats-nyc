import { NewFeatureMutation } from './../../constants/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import supabase from '../../supabase'
import { insertCatProperty, insertMapBoxFeature } from '../../supabase/db'
//{ uuid, name, rating, image, geo_json, address, locality }: any,
const newFeature = async ({
  CatProperties,
  MapBoxFeature,
}: NewFeatureMutation) => {
  try {
    const { id } = await insertCatProperty(CatProperties)
    const data = await insertMapBoxFeature(MapBoxFeature, id)
    //console.log('MUTATION RESPONSE: ', data)
  } catch (error) {
    console.error(error)
    return error
  }
}

const useNewFeatureMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: newFeature,
    onSuccess: () => {
      //console.log('ON SUCCESS')
      return queryClient.invalidateQueries(['features'])
    },
  })
}

export { useNewFeatureMutation as default, newFeature }
