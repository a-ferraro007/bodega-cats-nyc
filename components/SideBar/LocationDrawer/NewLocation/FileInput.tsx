/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from 'react'
import { Path, UseFormRegister } from 'react-hook-form'
import { FormInputs } from '../../../../constants/types'
import AddPhoto from '../../../../svg/AddPhoto'
import ChangePhoto from '../../../../svg/ChangePhoto'

type FileInputProps = {
  label: Path<FormInputs>
  register: UseFormRegister<FormInputs>
  required?: boolean
}

const FileInputContainer = ({ children, image }: any) => {
  return (
    <div
      className={`peer relative mx-auto  h-48 w-full  max-w-[12rem] cursor-pointer overflow-hidden rounded-[10px] bg-[#E5E8F5] text-center shadow-default transition-all  duration-500 md:h-52 md:max-w-[13rem]`}
      tabIndex={0}
    >
      <div
        className={`absolute z-10 flex h-full w-full flex-1 basis-full items-end justify-end p-2`}
      >
        {children}
      </div>
      {image && (
        <Image
          alt="uploaded image"
          src={image}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
          fill
        />
      )}
    </div>
  )
}

const FileInput = ({ label, required, register }: FileInputProps) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>()

  const HandleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    reader.addEventListener(
      'load',
      () => {
        // convert image file to base64 string
        setImage(reader.result)
      },
      false
    )
    if (e.target && e.target.files) {
      reader.readAsDataURL(e.target.files[0])
    }
  }

  useEffect(() => {
    console.log('FILE UPLOAD IMAGE:', image)
  }, [image])

  return (
    <>
      <FileInputContainer image={image}>
        <label
          htmlFor="file-input"
          className={`cursor-pointer rounded-[10px] bg-white  bg-opacity-60 px-2 py-1 font-nunito  text-xs font-bold text-graphite shadow-xl backdrop-blur-lg transition-all duration-300 hover:-translate-y-[2px]`}
        >
          <ChangePhoto />

          <input
            id="file-input"
            required={required}
            {...register(label, {
              onChange: (e) => HandleOnChange(e),
            })}
            type="file"
            accept="image/*"
            className="hidden"
          />
        </label>
      </FileInputContainer>
    </>
  )
}

export default FileInput

//const FileInputContainer = ({ children, image }: any) => {
//  return (
//    <div
//      className={`w-32 h-32 mx-auto transition-all duration-500 rounded-lg cursor-pointer text-center relative ${
//        !image && 'bg-lightBlue hover:bg-mediumBlue'
//      }`}
//      tabIndex={0}
//    >
//      <div className="w-full h-full z-10 absolute p-2">{children}</div>
//      {image && (
//        <img
//          alt="uploaded image"
//          src={image}
//          width="128"
//          height="128"
//          className="w-32 h-32 rounded-lg absolute"
//        />
//      )}
//    </div>
//  )
//}

//const FileInput = ({ label, required, register }: FileInputProps) => {
//  const [image, setImage] = useState<string | ArrayBuffer | null>()

//  const HandleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
//    const reader = new FileReader()
//    reader.addEventListener(
//      'load',
//      () => {
//        // convert image file to base64 string
//        setImage(reader.result)
//      },
//      false
//    )
//    if (e.target && e.target.files) {
//      reader.readAsDataURL(e.target.files[0])
//    }
//  }
//  return (
//    <>
//      <FileInputContainer image={image}>
//        <label
//          htmlFor="file-input"
//          className={`flex flex-col h-full justify-center items-center rounded-lg cursor-pointer ${
//            !image && 'border-2'
//          }`}
//        >
//          {!image && (
//            <div className="flex flex-col justify-center items-center">
//              <svg
//                aria-hidden="true"
//                className="mb-3 w-6 h-6 text-graphite"
//                fill="none"
//                stroke="currentColor"
//                viewBox="0 0 24 24"
//                xmlns="http://www.w3.org/2000/svg"
//              >
//                <path
//                  strokeLinecap="round"
//                  strokeLinejoin="round"
//                  strokeWidth="2"
//                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                ></path>
//              </svg>

//              <p className="mb-2 text-[.65rem] text-graphite ">
//                <span className="font-bold font-roboto">Click to upload</span>
//              </p>
//              <p className="text-[.5rem] font-bold font-roboto text-graphite">
//                SVG, PNG, JPG or GIF (MAX. 800x400px)
//              </p>
//            </div>
//          )}
//          <input
//            id="file-input"
//            required={required}
//            {...register(label, {
//              onChange: (e) => HandleOnChange(e)
//            })}
//            type="file"
//            accept="image/*"
//            className="hidden"
//          />
//        </label>
//      </FileInputContainer>
//    </>
//  )
//}
