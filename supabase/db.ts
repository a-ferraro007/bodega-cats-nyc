import { CatProperties, MapBoxFeature } from './../constants/types'
import supabase from '.'

const selectFromFeature = async (query: Array<string>) => {
  try {
    const { data, error } = await supabase.from('MapBox_Feature').select(...query)
    if (error) throw error
    return data
  } catch (error) {
    throw new Error('error fetching FeatureCollection geo_json', { cause: error })
  }
}

const selectTopInArea = async (borough: string) => {
  try {
    const { data, error } = await supabase
      .from('Cat_Properties')
      .select(`*, MapBox_Feature (*)`)
      .eq('locality', 'Brooklyn')
      .order('rating', { ascending: false })

    if (error) throw error
    return data
  } catch (error) {
    throw new Error('error fetching top list in area', { cause: error })
  }
}

const insertCatProperty = async (CatProperties: CatProperties) => {
  try {
    const { data, error } = await supabase.from('Cat_Properties').insert(CatProperties).select('id')
    if (error) throw error
    return data[0]
  } catch (error) {
    throw new Error('error inserting into Cat_Properties table', { cause: error })
  }
}

const insertMapBoxFeature = async (tableData: MapBoxFeature, catId: number) => {
  try {
    const { data, error } = await supabase
      .from('MapBox_Feature')
      .insert({ ...tableData, cat_id: catId })
    if (error) throw error
    return data
  } catch (error) {
    throw new Error('error inserting into MapBox_Feature table', { cause: error })
  }
}

export { selectFromFeature, selectTopInArea, insertCatProperty, insertMapBoxFeature }
