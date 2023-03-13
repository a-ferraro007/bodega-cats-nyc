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
import MotionDiv from '../../../MotionDiv'
import { AnimatePresence, motion } from 'framer-motion'
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
  const { setAuthStatus } = useAuthStore((state) => state)
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
      button_open: { opacity: 1 },
      button_close: { opacity: 0 },
    },
    submit_button: {
      key_down: {
        boxShadow:
          'inset 1px 1px 3px rgba(0,0,0,.25), 0 1px 2px rgba(0,0,0,.05)',
        scale: 0.99,
      },
      key_up: { boxShadow: '0 2px 4px rgba(0,0,0,.05)' },
    },
  }

  return (
    <div className="h-full w-full">
      {newLocOpen && (
        <div className="flex justify-center">
          <motion.button
            className="mb-1 p-3"
            onClick={() => handleBackBtnCick()}
            initial={'button_close'}
            animate={'button_open'}
            exit={'button_close'}
            transition={{
              delay: 0,
              ease: 'circOut',
              duration: 0.35,
            }}
            key={'button_open'}
            variants={Variants.button}
          >
            <Line />
            {/*<CloseArrow rotate={isMobile ? 'rotate(90)' : 'rotate(0)'} />*/}
          </motion.button>
        </div>
      )}

      <form
        className="flex h-full flex-auto basis-full flex-col gap-4 overflow-y-scroll p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset>
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
        <fieldset>
          <FileInput label="file" required={true} register={register} />
        </fieldset>
        <fieldset className="flex flex-grow flex-col justify-end">
          <motion.button
            layout
            initial={'key_up'}
            whileTap={'key_down'}
            //whileFocus={'focus'}
            exit={{ opacity: 0 }}
            transition={{ delay: 0, ease: 'linear', duration: 0.125 }}
            variants={Variants.submit_button}
            key={`submit-button-press`}
            type="submit"
            className="group mb-8  w-full rounded-[10px] border border-[rgba(0,0,0,.08)] bg-white p-1 px-3 py-2 font-nunito text-lg font-bold text-graphite shadow-default"
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
