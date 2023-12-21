import { twMerge } from 'tailwind-merge'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export interface InputGroupProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  labelClassName?: string
}

export default function InputGroup(props: InputGroupProps) {
  let id = props.id
  if (!id) id = [props?.defaultValue?.toString() ?? '', props?.name?.toString() ?? ''].join('')

  return (
    <div className='flex items-center gap-2'>
      {id && props.name && !props.hidden && (
        <label htmlFor={id} className={twMerge('min-w-[50px] capitalize', props.labelClassName)}>
          {props.name?.replace(/[^A-Za-z0-9]/g, ' ')}:
        </label>
      )}
      <input {...props} id={id} />
    </div>
  )
}
