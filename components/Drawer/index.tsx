import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Rating from '../Rating'
import Input from '../Input'
import FileInput from '../Input/FileInput'
import { useUser } from '@supabase/auth-helpers-react'
import useNewFeatureMutation from '../../hooks/NewFeature'
import { FormInputs, NewFeatureMutation } from '../../constants/types'
import supabase from '../../supabase'
import { useStore } from '../../store'

interface DrawerProps {
  handleStateReset: () => void
}

const Drawer = ({ handleStateReset }: DrawerProps) => {
  const drawerState = useStore((state) => state.drawerState)
  const setDrawerStateStore = useStore((state) => state.setDrawerState)
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const user = useUser()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormInputs>()
  const newFeatureMutation = useNewFeatureMutation()
  const { LocationData, FeatureData } = drawerState

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (!user) return //handling not being logged in
    if (!LocationData) return
    if (!FeatureData) return

    const uuid = user?.id
    const { name, address, file } = data
    let sbImgURL
    let geo_json = { ...FeatureData }
    geo_json['properties'] = { name, address, rating }

    if (!file?.length || !name || !address) return //Set an Error state

    try {
      const { data: storageData, error: storageError } = await supabase.storage
        .from('cat-images')
        .upload(crypto.randomUUID(), file[0])
      if (storageError) throw storageError

      sbImgURL = supabase.storage.from('cat-images').getPublicUrl(storageData.path).data.publicUrl
      geo_json.properties['image'] = sbImgURL
    } catch (error) {
      console.log(error)
      return //handle error in form
    }

    const mutationReqData: NewFeatureMutation = {
      CatProperties: {
        name,
        rating,
        image: sbImgURL,
        locality: LocationData.locality
      },
      MapBoxFeature: {
        feature_id: LocationData.feature_id,
        user_id: uuid,
        address,
        geo_json
      }
    }

    console.log(mutationReqData)

    newFeatureMutation.mutate(mutationReqData)
    handleStateReset()
  }

  return (
    <div className="absolute top-32 right-0  z-10 bg-white w-[350px] shadow-[0_6px_30px_-10px] rounded-md px-6 py-4 overflow-scroll">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl leading-6 font-baloo font-bold text-graphite text-center mb-3">
          {' '}
          Add Cat{' '}
        </h2>
        <fieldset className="mb-8">
          <FileInput label="file" required={true} register={register} />
        </fieldset>

        <fieldset className="mb-8">
          <Input id="name-input" label="name" type="name" register={register} required={true} />
        </fieldset>

        <fieldset className="mb-4">
          <Input
            id="address-input"
            label="address"
            type="address"
            register={register}
            defaultValue={LocationData?.address}
          />
        </fieldset>

        <fieldset className="mb-6">
          <label className="font-bold font-baloo text-sm">rating</label>
          <Rating rating={rating} hover={hover} setRating={setRating} setHover={setHover} />
        </fieldset>
        <fieldset className="w-full">
          <button
            type="submit"
            className="w-full bg-[#1e30a4] text-[16px] px-3 py-2 rounded-md text-primaryGold font-baloo font-semibold"
          >
            submit
          </button>
          {/*<button
            className="text-[14px] underline text-graphite font-semibold font-baloo"
            onClick={() => handleStateReset()}
          >
            close
          </button>*/}
        </fieldset>
      </form>
    </div>
  )
}

export default Drawer
