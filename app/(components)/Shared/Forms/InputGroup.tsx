import { twMerge } from 'tailwind-merge'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { DynamicText, ResponsiveElementProps } from '@/app/(components)/Shared/Responsive/DynamicText'

export interface InputGroupProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, ResponsiveElementProps {
  labelClassName?: string
}

export default function InputGroup(props: InputGroupProps) {
  let id = props.id
  if (!id) id = [props?.defaultValue?.toString() ?? '', props?.name?.toString() ?? ''].join('')

  if (props.isPending) {
    return (
      <div className='flex items-center gap-2'>
        <DynamicText content='' skWidth='w-16' isPending />
        <div className='flex flex-1 rounded-md dark:bg-neutral-600/60'>
          <DynamicText content='' skWidth='w-full' skContainerClassName='flex-1 py-2 px-2' isPending />
        </div>
      </div>
    )
  }

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
