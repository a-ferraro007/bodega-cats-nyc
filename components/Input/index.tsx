import { HTMLInputTypeAttribute } from 'react'
import { Path, UseFormRegister } from 'react-hook-form'
import { FormInputs } from '../../constants/types'

type InputProps = {
  id: string
  type: HTMLInputTypeAttribute
  label: Path<FormInputs>
  register: UseFormRegister<FormInputs>
  required?: boolean
  defaultValue?: any
}

const Input = ({ id, type, label, defaultValue, required, register }: InputProps) => {
  return (
    <div className="w-full relative group">
      <input
        id={id}
        defaultValue={defaultValue}
        readOnly={defaultValue || false}
        required={required}
        type={type}
        {...register(label)}
        className={`w-full h-10 px-4 text-sm font-bold font-baloo peer bg-gray-100 rounded-md outline-none disabled:cursor-not-allowed`}
      />
      <label
        className={`text-lg font-bold font-baloo transform transition-all duration-500 absolute top-0 left-0 h-full flex items-center pl-2 group-focus-within:text-sm  group-focus-within:h-1/2  group-focus-within:-translate-y-full  group-focus-within:pl-0
        peer-valid:-translate-y-full peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-sm
        peer-read-only:-translate-y-full peer-read-only:h-1/2 peer-read-only:pl-0 peer-read-only:text-sm
        pointer-events-none`}
      >
        {label}
      </label>
    </div>
  )
}

export default Input
