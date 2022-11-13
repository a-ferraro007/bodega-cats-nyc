import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from 'react'
import { Path, UseFormRegister } from 'react-hook-form'
import { FormInputs } from '../../constants/types'

type FileInputProps = {
  label: Path<FormInputs>
  register: UseFormRegister<FormInputs>
  required?: boolean
}

const FileInput = ({ label, required, register }: FileInputProps) => {
  const { onBlur, name, ref } = register(label)
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
  return (
    <>
      <div
        className={`w-[150px] h-[125px] mx-auto transition-all duration-500 rounded-lg cursor-pointer  p-2 text-center relative ${
          !image && 'bg-slate-200 hover:bg-slate-300'
        }`}
      >
        <label
          htmlFor="file-input"
          className="flex flex-col h-full justify-center items-center rounded-lg border-2  cursor-pointer p-2"
        >
          {!image && (
            <div className="flex flex-col justify-center items-center">
              <svg
                aria-hidden="true"
                className="mb-3 w-6 h-6 text-graphite"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>

              <p className="mb-2 text-[.65rem] text-graphite ">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-[.5rem] text-graphite">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
          )}
          <input
            id="file-input"
            required={required}
            {...register(label, {
              onChange: (e) => HandleOnChange(e)
            })}
            //{...register(label)}
            type="file"
            accept="image/*"
            className="hidden"
          />
        </label>
      </div>
    </>
  )
}

export default FileInput
