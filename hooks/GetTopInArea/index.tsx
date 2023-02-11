import { selectTopInArea } from '../../supabase/db'

const getTopInArea = async (borough: string) => {
  return await selectTopInArea(borough)
}

export default getTopInArea
