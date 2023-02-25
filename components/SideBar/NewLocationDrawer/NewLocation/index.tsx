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

const NewLocation = () => {
  const { authStatus, setAuthStatus } = useAuthStore((state) => state)
  const { newLocation, setNewLocation } = useDrawerContext()
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const user = useUser()
  const { session } = useSessionContext()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>()
  const newFeatureMutation = trpc.addLocation.useMutation()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    let sbImgURL
    let geo_json
    if (!user || !session) {
      setAuthStatus(false)
      return
    } //handling not being logged in
    if (!newLocation) return
    const { ParsedFeature, Feature } = newLocation

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
    <div className="z-10 h-full w-full overflow-scroll">
      <form
        className="flex h-full flex-auto basis-full flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/*<button
          className="self-center translate-y-2 hover:bg-gray-100 focus:bg-gray-100 py-1 px-2 rounded-md transition-all duration-300"
          onClick={(event: any) => {
            event.preventDefault()
            if (searchMarker) {
              searchMarker.remove()
              setSearchMarker(null)
            }
            if (query.length === 0) {
              setDrawerState({ searchDrawerIsActive: false, featureDrawerIsActive: false })
            } else {
              setDrawerState({ searchDrawerIsActive: true, featureDrawerIsActive: false })
            }
          }}
        >
          <svg
            width="15"
            height="18"
            viewBox="0 0 27 30"
            fill="none"
            className="hover:fill-black focus:fill-black"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.585786 13.5858C-0.195262 14.3668 -0.195262 15.6332 0.585786 16.4142L13.3137 29.1421C14.0948 29.9232 15.3611 29.9232 16.1421 29.1421C16.9232 28.3611 16.9232 27.0948 16.1421 26.3137L4.82843 15L16.1421 3.68629C16.9232 2.90524 16.9232 1.63891 16.1421 0.857864C15.3611 0.0768158 14.0948 0.0768158 13.3137 0.857864L0.585786 13.5858ZM27 13L2 13V17L27 17V13Z"
              fill="#242424"
            />
          </svg>
        </button>*/}
        {/*<div className="flex flex-col">
          <h2 className="text-2xl leading-6 font-nunito font-extrabold text-graphite text-center ">
            {' '}
            Add Cat{' '}
          </h2>
        </div>*/}
        <fieldset>
          <FileInput label="file" required={true} register={register} />
        </fieldset>
        <div className="px-6">
          {' '}
          <div className="mb-8 flex flex-col gap-4">
            {/*className="mb-8"*/}

            {/*<div className="self-center">*/}
            <fieldset className="mb-8">
              <Input
                id="name-input"
                label="name"
                type="name"
                register={register}
                required={true}
              />
            </fieldset>
            {/*className="mb-4"*/}
            <fieldset>
              <Input
                id="address-input"
                label="address"
                type="address"
                register={register}
                defaultValue={newLocation?.ParsedFeature?.address}
              />
            </fieldset>
            {/*</div>*/}
          </div>
          <fieldset className="">
            <label className="font-nunito text-sm font-bold">rating</label>
            <Rating
              rating={rating}
              hover={hover}
              setRating={setRating}
              setHover={setHover}
            />
          </fieldset>
        </div>
        <fieldset className="flex flex-grow flex-col justify-end">
          <button
            type="submit"
            className="w-full  rounded-md border-slate-200 bg-slate-200 px-3 py-2 font-nunito text-lg font-bold text-graphite transition-all duration-300 hover:bg-slate-300 hover:font-extrabold focus:bg-slate-300 focus:font-extrabold"
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
