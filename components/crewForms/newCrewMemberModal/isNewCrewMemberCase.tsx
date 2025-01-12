import { Input, Select, SelectItem } from '@nextui-org/react'


const IsNewCrewMemberCase = ({newSailor, setNewSailor, fieldState}) => {
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <p className='mb-2'>Nombre y apellido</p>
        <Input
          aria-label='name'
          placeholder='Ingrese nombre del marinero'
          defaultValue={fieldState.inputValue}
          value={newSailor.name}
          onChange={e => setNewSailor({ ...newSailor, name: e.target.value })}
        />
      </div>
      <div>
        <p className='mb-2'>Nro de libreta</p>
        <Input
          aria-label='sailorBookNumber'
          placeholder='Ingrese Número de libreta del marinero'
          type='number'
          onChange={e =>
            setNewSailor({
              ...newSailor,
              sailor_book_number: e.target.value
            })
          }
        />
      </div>
      <div>
        <p className='mb-2'>Teléfono</p>
        <Input
          aria-label='celNumber'
          type='number'
          placeholder='Ingrese nombre del marinero'
          onChange={e =>
            setNewSailor({
              ...newSailor,
              celNumber: e.target.value
            })
          }
        />
      </div>
      <div>
        <p className='mb-2'>Cargo</p>
        <Select
          placeholder='Seleccione rol en la tripulación'
          aria-label='rol'
          value={newSailor.charge}
          onChange={e =>
            setNewSailor({
              ...newSailor,
              charge: e.target.value
            })
          }
        >
          <SelectItem key={'Armador'}>Armador</SelectItem>
          <SelectItem key={'Capitan'}>Capitan</SelectItem>
          <SelectItem key={'Jefe de máquinas'}>Jefe de máquinas</SelectItem>
          <SelectItem key={'Cocinero'}>Cocinero</SelectItem>
          <SelectItem key={'Marinero'}>Marinero</SelectItem>
        </Select>
        <div>
          <h3 className='font-semibold my-4'>Marinero a crear:</h3>
          <p>
            Nombre:{' '}
            <span className={newSailor?.name === '' && 'text-gray-500'}>
              {newSailor?.name !== ''
                ? newSailor.name
                : 'Ingrese nombre de marinero marinero'}
            </span>
          </p>
          <p>
            Nro de libreta:{' '}
            <span
              className={newSailor.sailor_book_number === '' && 'text-gray-500'}
            >
              {newSailor.sailor_book_number !== ''
                ? newSailor.sailor_book_number
                : 'Agregue Nro de libreta'}
            </span>
          </p>
          <p>
            Celular:{' '}
            <span className={newSailor.celNumber === '' && 'text-gray-500'}>
              {newSailor.sailor_book_number !== ''
                ? newSailor.celNumber
                : 'Agregue Nro de Telefóno'}
            </span>
          </p>
          <p>
            Rol actual:{' '}
            <span className={newSailor.charge === '' && 'text-gray-500'}>
              {newSailor.charge !== '' ? newSailor.charge : 'Seleccione cargo'}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
export default IsNewCrewMemberCase