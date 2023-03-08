import { NewFeatureMutation } from './../../../constants/types'
import { insertCatProperty, insertMapBoxFeature } from '../../supabase/db'
import { SupabaseClient } from '@supabase/supabase-js'

const newLocation = async (
  { CatProperties, MapBoxFeature }: NewFeatureMutation,
  supabase: SupabaseClient
) => {
  try {
    const { id } = await insertCatProperty(CatProperties, supabase)
    const data = await insertMapBoxFeature(MapBoxFeature, id, supabase)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export { newLocation }
