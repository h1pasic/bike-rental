'use client'
import { WithId } from 'mongodb'
import Station from '@/typings/Station'
import { useState } from 'react'
import structureClasses from '@/lib/Shared/structureClasses'
import DeleteStationAction from '@/actions/stations/DeleteStationAction'
import InputGroup from '@/app/(components)/Shared/Forms/InputGroup'
import useForm from '@/hooks/useForm'
import UpdateStationAction from '@/actions/stations/UpdateStationAction'

export default function RenderStation({ station: initialStation, editable }: { station: WithId<Station>; editable?: boolean }) {
  const [station, setStation] = useState<WithId<Station>>(initialStation)
  const { onChange } = useForm(station, setStation)

  return (
    <form className='rounded-lg bg-neutral-200/50 px-4 py-2 dark:bg-neutral-700/40'>
      <h2 className='mb-4 border-b-[2px] border-gray-400 pb-1 text-lg font-semibold dark:border-gray-500'>{station.name}</h2>

      <div className={structureClasses('mb-2 flex flex-col gap-2')}>
        <InputGroup name='_id' hidden className='flex-1 rounded-md px-2 py-1 dark:bg-neutral-600/60 dark:text-gray-200' defaultValue={station._id.toString()} readOnly />
        <InputGroup name='name' onChange={onChange} readOnly={!editable} className='flex-1 rounded-md px-2 py-1 dark:bg-neutral-600/60 dark:text-gray-200' defaultValue={station.name} />
        <InputGroup
          name='city'
          data-path={['address']}
          data-result='a'
          onChange={onChange}
          readOnly={!editable}
          className='flex-1 rounded-md px-2 py-1 dark:bg-neutral-600/60 dark:text-gray-200'
          defaultValue={station.address.city}
        />
        <InputGroup
          name='coordinates'
          data-path={['address']}
          data-result='array<number>'
          onChange={onChange}
          readOnly={!editable}
          className='flex-1 rounded-md px-2 py-1 dark:bg-neutral-600/60 dark:text-gray-200'
          defaultValue={station.address.coordinates.join(', ')}
        />
        <InputGroup
          name='allowedCategories'
          data-path={['address']}
          data-result='array<string>'
          onChange={onChange}
          readOnly={true}
          className='flex-1 rounded-md px-2 py-1 dark:bg-neutral-600/60 dark:text-gray-200'
          defaultValue={station.address.parkingPlaces.map((p) => p.allowedCategories.join(', ')).join('; ')}
        />
      </div>

      {editable && (
        <div className='mt-4 flex justify-end gap-2'>
          <button
            className='rounded-md bg-blue-800/50 px-2 py-1 uppercase tracking-wide text-gray-100 dark:bg-blue-400/50 dark:text-gray-200'
            formAction={() => UpdateStationAction(initialStation._id, station)}>
            Update
          </button>
          <button className='rounded-md bg-red-800/50 px-2 py-1 uppercase tracking-wide text-gray-100 dark:bg-red-400/50 dark:text-gray-200' formAction={() => DeleteStationAction(station)}>
            Delete
          </button>
        </div>
      )}
    </form>
  )
}
