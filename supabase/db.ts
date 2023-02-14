import {
  CatProperties,
  MapBoxFeature,
  RowId,
  TopFeatureInterface,
  FeatureInterface,
} from './../constants/types'
import supabase from '.'

const selectFromFeature = async (): Promise<FeatureInterface[]> => {
  try {
    const { data, error } = await supabase
      .from('Cat_Properties')
      .select(`*, MapBox_Feature(*)`)
    if (error) throw error

    return data as FeatureInterface[]
  } catch (error) {
    throw new Error('error fetching FeatureCollection geo_json', {
      cause: error,
    })
  }
}

const selectTopInArea = async (
  borough: string
): Promise<TopFeatureInterface[]> => {
  try {
    const { data, error } = await supabase
      .from('Cat_Properties')
      .select(`*, MapBox_Feature (*)`)
      .eq('locality', borough)
      .order('rating', { ascending: false })

    if (error) throw error

    return data as TopFeatureInterface[]
  } catch (error) {
    throw new Error('error fetching top list in area', { cause: error })
  }
}

const insertCatProperty = async (
  CatProperties: CatProperties
): Promise<RowId> => {
  try {
    const { data, error } = await supabase
      .from('Cat_Properties')
      .insert(CatProperties)
      .select('id')
    if (error) throw error
    return data[0]
  } catch (error) {
    throw new Error('error inserting into Cat_Properties table', {
      cause: error,
    })
  }
}

const insertMapBoxFeature = async (tableData: MapBoxFeature, catId: number) => {
  try {
    const { data, error } = await supabase
      .from('MapBox_Feature')
      .insert({ ...tableData, cat_id: catId } as any) //TYPE THIS
    if (error) throw error
    return data
  } catch (error) {
    throw new Error('error inserting into MapBox_Feature table', {
      cause: error,
    })
  }
}

export {
  selectFromFeature,
  selectTopInArea,
  insertCatProperty,
  insertMapBoxFeature,
}
