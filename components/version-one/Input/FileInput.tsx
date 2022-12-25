/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, useEffect, useState } from 'react'
import { Path, UseFormRegister } from 'react-hook-form'
import { FormInputs } from '../../../constants/types'

type FileInputProps = {
  label: Path<FormInputs>
  register: UseFormRegister<FormInputs>
  required?: boolean
}

const FileInputContainer = ({ children, image }: any) => {
  return (
    <div
      className={`w-full h-80 mx-auto transition-all duration-500 rounded-lg cursor-pointer text-center relative bg-lightBlue peer`}
      //!image && 'bg-lightBlue hover:bg-mediumBlue'
      tabIndex={0}
    >
      <div
        className={`flex flex-1 basis-full w-full h-full items-end justify-center z-10 absolute p-2`}
      >
        {children}
      </div>
      {image && (
        <img
          alt="uploaded image"
          src={image}
          width="264"
          height="144"
          className="w-full h-full rounded-lg absolute"
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
          className={`text-xs text-graphite font-bold font-nunito px-2 py-1 rounded-xl mb-2  shadow-xl transition-all duration-300 hover:-translate-y-[2px] cursor-pointer bg-white bg-opacity-60 backdrop-blur-lg`}
        >
          {!image && (
            <>
              <svg
                className="inline mr-1 -translate-y-[1px]"
                width="12"
                height="12"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0508 24.4922C18.5898 24.4922 24.0039 19.0664 24.0039 12.5391C24.0039 6 18.5781 0.585938 12.0391 0.585938C5.51172 0.585938 0.0976562 6 0.0976562 12.5391C0.0976562 19.0664 5.52344 24.4922 12.0508 24.4922ZM12.0508 22.5C6.51953 22.5 2.10156 18.0703 2.10156 12.5391C2.10156 7.00781 6.50781 2.57812 12.0391 2.57812C17.5703 2.57812 22.0117 7.00781 22.0117 12.5391C22.0117 18.0703 17.582 22.5 12.0508 22.5ZM6.61328 12.5391C6.61328 13.1133 7.01172 13.5 7.60938 13.5H11.0547V16.957C11.0547 17.543 11.4531 17.9531 12.0273 17.9531C12.6133 17.9531 13.0234 17.5547 13.0234 16.957V13.5H16.4805C17.0664 13.5 17.4766 13.1133 17.4766 12.5391C17.4766 11.9531 17.0664 11.543 16.4805 11.543H13.0234V8.09766C13.0234 7.5 12.6133 7.08984 12.0273 7.08984C11.4531 7.08984 11.0547 7.5 11.0547 8.09766V11.543H7.60938C7.01172 11.543 6.61328 11.9531 6.61328 12.5391Z"
                  fill="black"
                />
              </svg>
              add a photo
            </>
          )}{' '}
          {image && (
            <>
              <svg
                className="inline mr-1 -translate-y-[1px]"
                width="12"
                height="12"
                viewBox="0 0 30 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.66797 23.3438H26.0898C28.5273 23.3438 29.7695 22.125 29.7695 19.7109V7.44141C29.7695 5.02734 28.5273 3.82031 26.0898 3.82031H22.7383C21.8125 3.82031 21.5312 3.63281 21.0039 3.04688L20.0664 1.99219C19.4805 1.34766 18.8828 0.996094 17.6758 0.996094H13C11.793 0.996094 11.1953 1.34766 10.6094 1.99219L9.67188 3.04688C9.14453 3.62109 8.85156 3.82031 7.9375 3.82031H4.66797C2.21875 3.82031 0.988281 5.02734 0.988281 7.44141V19.7109C0.988281 22.125 2.21875 23.3438 4.66797 23.3438ZM4.69141 21.457C3.54297 21.457 2.875 20.8359 2.875 19.6172V7.54688C2.875 6.32812 3.54297 5.70703 4.69141 5.70703H8.40625C9.46094 5.70703 10.0352 5.50781 10.6211 4.85156L11.5352 3.82031C12.2031 3.07031 12.5547 2.88281 13.5859 2.88281H17.0898C18.1211 2.88281 18.4727 3.07031 19.1406 3.82031L20.0547 4.85156C20.6406 5.50781 21.2148 5.70703 22.2695 5.70703H26.0547C27.2148 5.70703 27.8828 6.32812 27.8828 7.54688V19.6172C27.8828 20.8359 27.2148 21.457 26.0547 21.457H4.69141ZM15.3789 19.7695C18.918 19.7695 21.7656 16.9336 21.7656 13.3594C21.7656 9.79688 18.9297 6.96094 15.3789 6.96094C11.8281 6.96094 8.98047 9.79688 8.98047 13.3594C8.98047 16.9336 11.8281 19.7695 15.3789 19.7695ZM22.2461 9.04688C22.2461 9.86719 22.9258 10.5117 23.7227 10.5117C24.5078 10.5117 25.1758 9.85547 25.1758 9.04688C25.1758 8.27344 24.5078 7.59375 23.7227 7.59375C22.9258 7.59375 22.2461 8.27344 22.2461 9.04688ZM15.3789 17.9883C12.8359 17.9883 10.75 15.9375 10.75 13.3594C10.75 10.793 12.8242 8.73047 15.3789 8.73047C17.9336 8.73047 19.9961 10.793 19.9961 13.3594C19.9961 15.9375 17.9336 17.9883 15.3789 17.9883Z"
                  fill="black"
                />
              </svg>
              change photo
            </>
          )}
          <input
            id="file-input"
            required={required}
            {...register(label, {
              onChange: (e) => HandleOnChange(e)
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
