import { MouseEventHandler, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Rating from '../../Rating'
import Input from '../../Input'
import FileInput from '../../Input/FileInput'
import { useSessionContext, useUser } from '@supabase/auth-helpers-react'
import useNewFeatureMutation from '../../../../hooks/NewFeature'
import { FormInputs, NewFeatureMutation } from '../../../../constants/types'
import supabase from '../../../../supabase'
import { useStore } from '../../../../store'
import { motion } from 'framer-motion'

const FeatureDrawer = () => {
  const drawerState = useStore((state) => state.featureDrawerState)
  const setDrawerState = useStore((state) => state.setDrawerState)
  const setAuthState = useStore((state) => state.setAuthState)
  const searchMarker = useStore((state) => state.searchMarker)
  const setSearchMarker = useStore((state) => state.setSearchMarker)
  const query = useStore((state) => state.searchQuery)
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const user = useUser()
  const { session } = useSessionContext()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormInputs>()
  const newFeatureMutation = useNewFeatureMutation()
  const { ParsedFeature, Feature } = drawerState

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log('DATA')

    if (!user || !session) {
      setAuthState(true)
      return
    } //handling not being logged in
    if (!ParsedFeature) return
    if (!Feature) return

    const uuid = user?.id
    const { name, address, file } = data
    let sbImgURL
    let geo_json = { ...Feature }
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
        locality: ParsedFeature.locality
      },
      MapBoxFeature: {
        feature_id: ParsedFeature.feature_id,
        user_id: uuid,
        address,
        geo_json
      }
    }
    console.log(mutationReqData)
    newFeatureMutation.mutate(mutationReqData)
  }

  useEffect(() => {
    console.log('NEW FEATURE MUTATION SUCCESS:', newFeatureMutation.isSuccess)
    if (newFeatureMutation.isSuccess) {
      if (searchMarker) {
        searchMarker.remove()
        setSearchMarker(null)
        console.log(searchMarker)
      }
      setDrawerState({ searchDrawerIsActive: true, featureDrawerIsActive: false })
    }
  }, [newFeatureMutation.isSuccess, searchMarker, setDrawerState, setSearchMarker])

  return (
    <div className="bg-ice z-10 w-full h-full rounded-md overflow-scroll">
      <form
        className="flex flex-col gap-6 h-full flex-auto basis-full"
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
          <div className="flex flex-col gap-4 mb-8">
            {/*className="mb-8"*/}

            {/*<div className="self-center">*/}
            <fieldset className="mb-8">
              <Input id="name-input" label="name" type="name" register={register} required={true} />
            </fieldset>
            {/*className="mb-4"*/}
            <fieldset>
              <Input
                id="address-input"
                label="address"
                type="address"
                register={register}
                defaultValue={ParsedFeature?.address}
              />
            </fieldset>
            {/*</div>*/}
          </div>
          <fieldset className="">
            <label className="font-bold font-nunito text-sm">rating</label>
            <Rating rating={rating} hover={hover} setRating={setRating} setHover={setHover} />
          </fieldset>
        </div>
        <fieldset className="flex-grow flex flex-col justify-end">
          <button
            type="submit"
            className="w-full  bg-slate-200 border-slate-200 text-lg px-3 py-2 rounded-md text-graphite font-nunito font-bold hover:bg-slate-300 hover:font-extrabold focus:font-extrabold focus:bg-slate-300 transition-all duration-300"
          >
            submit
          </button>
        </fieldset>
      </form>
    </div>
  )
}

//[#1e30a4]
export default FeatureDrawer
