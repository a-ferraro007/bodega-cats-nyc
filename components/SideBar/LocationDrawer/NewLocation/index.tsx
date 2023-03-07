import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Rating from './Rating'
import Input from './Input'
import FileInput from './FileInput'
import { FormInputs, NewFeatureMutation } from '../../../../constants/types'
import supabase from '../../../../supabase'
import { trpc } from '../../../../utils/trpc'
import { useDrawerContext } from '../../DrawerProvider'
import { useUser, useSessionContext } from '@supabase/auth-helpers-react'
import { useAuthStore } from '../../../../store'
import MotionDiv from '../../../MotionDiv'
import { AnimatePresence } from 'framer-motion'
import CloseArrow from '../../../../svg/CloseArrow'

const NewLocation = () => {
  const user = useUser()
  const { session } = useSessionContext()
  const utils = trpc.useContext()
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const { authStatus, setAuthStatus } = useAuthStore((state) => state)
  const { newLocation, setNewLocation, newLocOpen, setNewLocOpen } =
    useDrawerContext()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>()
  const newFeatureMutation = trpc.addLocation.useMutation({
    onSuccess() {
      utils.selectFeatures.invalidate()
      setNewLocOpen(false)
      setNewLocation(null)
    },
  })

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    let sbImgURL
    let geo_json
    if (!user || !session) {
      setAuthStatus(false)
      return
    } //handling not being logged in
    if (!newLocation) return
    const { ParsedFeature, Feature } = newLocation
    console.log('user', user)

    const uuid = user.id
    const { name, address, file } = data
    geo_json = { ...Feature }
    geo_json['properties'] = { name, address, rating }

    if (!file?.length || !name || !address) return //Set an Error state

    try {
      const { data: storageData, error: storageError } = await supabase.storage
        .from('cat-images')
        .upload(crypto.randomUUID(), file[0])
      if (storageError) throw storageError

      sbImgURL = supabase.storage
        .from('cat-images')
        .getPublicUrl(storageData.path).data.publicUrl
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
        locality: ParsedFeature.locality,
      },
      MapBoxFeature: {
        feature_id: ParsedFeature.feature_id,
        user_id: uuid,
        address,
        geo_json,
      },
    }

    console.log('MUTATION REQ DATA:', mutationReqData)

    newFeatureMutation.mutate(mutationReqData)
  }

  useEffect(() => {
    if (newFeatureMutation.isSuccess) {
      console.log('NEW FEATURE MUTATION SUCCESS:', newFeatureMutation.isSuccess)
    }
  }, [newFeatureMutation.isSuccess])

  return (
    <div className="h-full w-full overflow-scroll">
      <form
        className="flex h-full flex-auto basis-full flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset>
          <FileInput label="file" required={true} register={register} />
        </fieldset>
        <div className="px-4">
          {' '}
          <div className="flex flex-col gap-6">
            <fieldset>
              <Input
                id="name-input"
                label="name"
                type="name"
                register={register}
                required={true}
              />
            </fieldset>
            <fieldset>
              <Input
                id="address-input"
                label="address"
                type="address"
                register={register}
                defaultValue={newLocation?.ParsedFeature?.address}
              />
            </fieldset>
            <fieldset>
              <label className="font-nunito text-sm font-bold">rating</label>
              <Rating
                rating={rating}
                hover={hover}
                setRating={setRating}
                setHover={setHover}
              />
            </fieldset>
          </div>
        </div>
        <fieldset className="flex flex-grow flex-col justify-end">
          <button
            type="submit"
            className="mb-8 w-full rounded-md border-slate-200 bg-slate-200 px-3 py-2 font-nunito text-lg font-bold text-graphite transition-all duration-300 hover:bg-slate-300 hover:font-extrabold focus:bg-slate-300 focus:font-extrabold"
          >
            submit
          </button>
        </fieldset>
      </form>
    </div>
  )
}

//[#1e30a4]
export default NewLocation
