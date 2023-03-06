import { NewFeatureMutation } from './../../constants/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { insertCatProperty, insertMapBoxFeature } from '../../supabase/db'
import supabase from '../../supabase'

const newFeature = async ({
  CatProperties,
  MapBoxFeature,
}: NewFeatureMutation) => {
  try {
    console.log('MUTATION RESPONSE: ', supabase)
    const { id } = await insertCatProperty(CatProperties)
    const data = await insertMapBoxFeature(MapBoxFeature, id)
  } catch (error) {
    console.error(error)
    throw error
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
