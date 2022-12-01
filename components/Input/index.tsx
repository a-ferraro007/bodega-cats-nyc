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
  variant?: string
}

const Input = ({
  id,
  type,
  label,
  defaultValue,
  required,
  register,
  variant = 'default'
}: InputProps) => {
  let classNames
  switch (variant) {
    case 'outline':
      classNames = {
        input:
          'w-full h-10 px-4 text-sm font-semibold font-nunito peer bg-slate-200 rounded-md outline-none disabled:cursor-not-allowed',
        label:
          'text-lg font-semibold font-nunito transform transition-all duration-500 absolute top-0 left-0 h-full flex items-center pl-2 group-focus-within:text-sm  group-focus-within:h-1/2  group-focus-within:-translate-y-[11px] group-focus-within:pl-0 peer-valid:-translate-y-[11px] peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-sm peer-read-only:-translate-y-[11px] peer-read-only:h-1/2 peer-read-only:pl-0 peer-read-only:text-sm pointer-events-none'
      }
      break
    default:
      classNames = {
        input:
          'w-full h-10 px-4 text-sm font-semibold font-nunito peer outline-none disabled:cursor-not-allowed rounded-[15px] bg-[rgba(0,0,0,.1)] active:bg-[rgba(0,0,0,.06)] focus-within:bg-[rgba(0,0,0,.06)] transition-all duration-500 text-graphite',
        label:
          'text-lg font-semibold font-nunito transform transition-all duration-500 absolute top-0 left-0 h-full flex items-center pl-2 group-focus-within:text-sm  group-focus-within:h-1/2  group-focus-within:-translate-y-full group-focus-within:pl-0 peer-valid:-translate-y-full peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-sm peer-read-only:-translate-y-full peer-read-only:h-1/2 peer-read-only:pl-0 peer-read-only:text-sm pointer-events-none text-graphite'
      }
      break
  }

  return (
    <div className="w-full relative group">
      <input
        id={id}
        defaultValue={defaultValue}
        readOnly={defaultValue || false}
        required={required}
        type={type}
        {...register(label)}
        className={classNames.input}
      />
      <label className={classNames.label}>{label}</label>
    </div>
  )
}

export default Input
