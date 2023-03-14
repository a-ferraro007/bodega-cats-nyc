import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Rating from './Rating'
import Input from './Input'
import FileInput from './FileInput'
import { FormInputs, NewFeatureMutation } from '../../../../constants/types'
import supabase from '../../../../server/supabase'
import { trpc } from '../../../../utils/trpc'
import { useDrawerContext } from '../../DrawerProvider'
import { useUser, useSessionContext } from '@supabase/auth-helpers-react'
import { useAuthStore } from '../../../../store'
import { motion } from 'framer-motion'
import CloseArrow from '../../../../svg/CloseArrow'
import { useIsMobile } from '../../../../hooks'
import Line from '../../../../svg/Line'
const { insert } = trpc

const NewLocation = () => {
  const user = useUser()
  const { session } = useSessionContext()
  const utils = trpc.useContext()
  const isMobile = useIsMobile()
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const { newLocation, setNewLocation, newLocOpen, setNewLocOpen } =
    useDrawerContext()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>()
  const newFeatureMutation = insert.newLocation.useMutation({
    onSuccess() {
      utils.select.invalidate()
      setNewLocOpen(false)
      setNewLocation(null)
    },
  })

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (!user || !session) {
      return
    } //handling not being logged in
    if (!newLocation) return
    const { ParsedFeature, Feature } = newLocation
    let sbImgURL, geo_json

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
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  useEffect(() => {
    if (newFeatureMutation.isSuccess) {
      console.log('NEW FEATURE MUTATION SUCCESS:', newFeatureMutation.isSuccess)
    }
  }, [newFeatureMutation.isSuccess])

  const handleBackBtnCick = () => {
    setNewLocation(null)
    setNewLocOpen(false)
  }

  const Variants = {
    location: {
      location_open: { x: 0, opacity: 1, transition: { delayChildren: 4 } },
      location_close: { x: '100%', opacity: 1 },
      location_mobile_close: { y: '100%', opacity: 1 },
      location_mobile_open: { y: 30, opacity: 1 },
    },
    button: {
      key_down: {
        boxShadow:
          'inset 1px 1px 3px rgba(0,0,0,.25), 0 1px 2px rgba(0,0,0,.05)',
        scale: 0.99999,
      },
      key_up: { boxShadow: '0 2px 4px rgba(0,0,0,.05)' },
    },
    submit_button: {
      key_down_submit: {
        boxShadow:
          'inset 1px 1px 3px rgba(22,22,22,.8), 0 1px 2px rgba(0,0,0,.2)',
        scale: 0.99,
      },
      key_up_submit: { boxShadow: '0 2px 4px rgba(0,0,0,.2)' },
    },
  }

  return (
    <div className="h-full w-full p-4">
      <div className="flex flex-col items-center justify-between md:mb-6 md:flex-row">
        <motion.button
          className="mb-1 rounded-[10px] border-[rgba(0,0,0,.08)] p-[.115rem] md:border md:bg-white"
          onClick={() => handleBackBtnCick()}
          initial={'key_up'}
          whileTap={'key_down'}
          exit={'key_up'}
          transition={{
            delay: 0,
            ease: 'circOut',
            duration: 0.35,
          }}
          key={'button_open'}
          variants={Variants.button}
        >
          <span className="inline md:hidden">
            <Line />
          </span>
          <span className="hidden md:inline">
            <CloseArrow rotate={isMobile ? 'rotate(90)' : 'rotate(0)'} />
          </span>
        </motion.button>
        <h1 className="mb-3 self-start font-nunito text-[1.60rem] font-extrabold md:mb-0 md:self-center">
          new cat
        </h1>
      </div>

      <form
        className="flex h-full flex-auto basis-full flex-col gap-4 overflow-y-scroll"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset className="mb-1">
          <FileInput label="file" required={true} register={register} />
        </fieldset>
        <fieldset>
          <label className="block px-2 pb-1 font-nunito font-bold">name</label>
          <Input
            id="name-input"
            label="name"
            type="name"
            placeholder="name"
            register={register}
            required={true}
          />
        </fieldset>
        <fieldset>
          <label className="block px-2 pb-1 font-nunito font-bold ">
            location
          </label>
          <div className="flex h-full flex-col gap-3">
            <Input
              id="location-input"
              type="location"
              label="location"
              register={register}
              defaultValue={newLocation?.ParsedFeature?.name.toLowerCase()}
            />
            <Input
              id="address-input"
              label="address"
              type="address"
              register={register}
              defaultValue={newLocation?.ParsedFeature?.address}
            />
          </div>
        </fieldset>
        {/*<fieldset>
          <label className="px-2 pb-2 font-nunito font-bold">rating</label>
          <Rating
            rating={rating}
            hover={hover}
            setRating={setRating}
            setHover={setHover}
          />
        </fieldset>*/}
        <fieldset className="mt-2">
          <motion.button
            layout
            initial={'key_up_submit'}
            whileTap={'key_down_submit'}
            //whileFocus={'focus'}
            exit={{ opacity: 1 }}
            transition={{ delay: 0, ease: 'linear', duration: 0.125 }}
            variants={Variants.submit_button}
            key={`submit-button-press`}
            type="submit"
            className="group mb-8 w-full rounded-[10px] border border-[rgba(0,0,0,.08)] bg-graphite p-1 px-3 py-2 font-nunito text-lg font-bold text-white"
          >
            submit
          </motion.button>
        </fieldset>
      </form>
    </div>
  )
}

//[#1e30a4]
export default NewLocation
