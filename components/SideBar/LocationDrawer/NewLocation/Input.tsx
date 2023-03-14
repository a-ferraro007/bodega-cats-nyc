import { HTMLInputTypeAttribute } from 'react'
import { Path, UseFormRegister } from 'react-hook-form'
import { FormInputs } from '../../../../constants/types'

type InputProps = {
  id: string
  type: HTMLInputTypeAttribute
  label: Path<FormInputs>
  register: UseFormRegister<FormInputs>
  required?: boolean
  defaultValue?: any
  classNames?: string
  placeholder?: string
}

const Input = ({
  id,
  type,
  label,
  defaultValue,
  required,
  register,
  placeholder,
  classNames = '',
}: InputProps) => {
  return (
    <div className="flex h-10 w-full flex-row gap-1 rounded-[10px] bg-white px-2 font-nunito text-lg font-medium text-graphite shadow-[0_1px_3px_rgba(0,0,0,.04)] outline-none  transition-all duration-500 placeholder:text-graphite md:gap-3 md:px-4">
      <input
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
        readOnly={defaultValue || false}
        required={required}
        type={type}
        {...register(label)}
        className="font-regular placeholder:text-[rgb(93,93,93) h-full w-full bg-white font-nunito text-lg text-graphite outline-none  transition-all duration-500 placeholder:pl-1"
      />
    </div>
  )
}

export default Input
