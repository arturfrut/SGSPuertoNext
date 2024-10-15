import { Select, SelectItem } from '@nextui-org/react'

const IsOldCrewMemberCase = ({setSelectedSailor, selectedSailor, fieldState}) => {
  return (
    <>
      <div>
        <p className='mb-2'>Cargo</p>
        <Select
          isDisabled={!fieldState?.items.length || !selectedSailor?.name}
          className='mb-4'
          placeholder='Seleccione rol en la tripulación'
          aria-label='rol'
          value={selectedSailor?.charge ?? ''}
          onChange={e => {
            console.log(e.target)
            setSelectedSailor({
              ...selectedSailor,
              charge: e.target.value
            })
          }}
        >
          <SelectItem key={'Armador'}>Armador</SelectItem>
          <SelectItem key={'Capitan'}>Capitan</SelectItem>
          <SelectItem key={'Jefe de máquinas'}>Jefe de máquinas</SelectItem>
          <SelectItem key={'Cocinero'}>Armador</SelectItem>
          <SelectItem key={'Marinero'}>Armador</SelectItem>
        </Select>
      </div>
      <h3 className='font-semibold my-4'>Marinero seleccionado:</h3>
      <p>
        Nombre:{' '}
        <span
          className={
            (!fieldState?.items.length || !selectedSailor?.name) &&
            'text-gray-500'
          }
        >
          {!!fieldState?.items.length && selectedSailor?.name
            ? selectedSailor.name
            : 'Seleccione marinero'}
        </span>
      </p>
      <p>
        Nro de libreta:{' '}
        <span
          className={
            (!fieldState?.items.length || !selectedSailor?.name) &&
            'text-gray-500'
          }
        >
          {!!fieldState?.items.length && selectedSailor?.name
            ? selectedSailor.id
            : 'Seleccione marinero'}
        </span>
      </p>
      <p>
        Rol actual:{' '}
        <span
          className={
            (!fieldState?.items.length || !selectedSailor?.name) &&
            'text-gray-500'
          }
        >
          {!!fieldState?.items.length && selectedSailor?.name
            ? selectedSailor.charge
            : 'Seleccione cargo'}
        </span>
      </p>
    </>
  )
}

export default IsOldCrewMemberCase