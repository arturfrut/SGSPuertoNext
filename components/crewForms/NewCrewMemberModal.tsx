export const SearchIcon = () => (
  <svg
    aria-hidden='true'
    fill='none'
    focusable='false'
    height={24}
    role='presentation'
    viewBox='0 0 24 24'
    width={24}
  >
    <path
      d='M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
    />
    <path
      d='M22 22L20 20'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
    />
  </svg>
)

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'

import { useFilter } from '@react-aria/i18n'
import { useState } from 'react'

export const NewCrewMemberModal = ({ searchOptions }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  console.log('so',searchOptions)
  const closeModal = () => {
    onOpenChange() // Close the modal explicitly
    setNewSailor({ ...newSailor, isNewSailor: false })
  }

  const [newSailor, setNewSailor] = useState({
    isNewSailor: false,
    newSailorName: '',
    newSailorNumber: '',
    newSailorCellNumber: ''
  })

  const [fieldState, setFieldState] = useState({
    selectedKey: '',
    inputValue: '',
    items: searchOptions
  })

  const { startsWith } = useFilter({ sensitivity: 'base' })

  const onSelectionChange = (key: any) => {
    const selectedItem = fieldState.items.find((option: { value: any }) => option.value === key)
    setFieldState({
      inputValue: selectedItem?.label || '',
      selectedKey: key,
      items: searchOptions.filter((item: { label: string }) =>
        startsWith(item.label, selectedItem?.label || '')
      )
    })
  }

  const onInputChange = (value: string ) => {
    const items = searchOptions.filter((item: { label: string }) => startsWith(item.label, value))
    setFieldState({
      inputValue: value,
      selectedKey: value === '' ? '' : fieldState.selectedKey,
      items: items
    })
    value && !items.length && fieldState.inputValue !== ''
      ? setNewSailor({ ...newSailor, isNewSailor: true })
      : setNewSailor({ ...newSailor, isNewSailor: false })
  }

  const sendData = (closeModal: { (): void; (): void }) => {
    closeModal()
    const itemSelected = searchOptions.find(
      (      item: { value: string }) => item.value == fieldState.selectedKey
    )
    console.log(
      'Data enviada',
      newSailor.isNewSailor ? 'nuevo marinero' : itemSelected
    )
  }

  return (
    <>
      <Button onPress={onOpen}>Agregar Tripulante</Button>

      <Modal isOpen={isOpen} onOpenChange={closeModal}>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            Cargar nuevo tripulante
          </ModalHeader>
          <ModalBody>
            <p>Buscar Marinero en Base de datos</p>

            <div className='flex w-full flex-wrap'>
              <Autocomplete
                className='max-w-xs'
                inputValue={fieldState.inputValue}
                items={fieldState.items}
                label='Lista de tripulantes'
                placeholder='Seleccione tripulante'
                selectedKey={fieldState.selectedKey}
                variant='bordered'
                onInputChange={onInputChange}
                onSelectionChange={onSelectionChange}
              >
                {item => (
                  <AutocompleteItem key={1}>
                    Falta completar
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>
            {newSailor.isNewSailor && (
              <>
                <p className='text-red-500'>
                  El marinero no esta en la lista, desea agregarlo?
                </p>
                <Input label='Nombre de marinero' />
                <Input label='Número de libreta de marinero' />
                <Input label='Número de celular del marinero' />
                <Button>Agregar marinero</Button>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button as='a' color='danger' variant='light' onPress={closeModal}>
              Volver atrás
            </Button>
            <Button color='primary' onPress={() => sendData(closeModal)}>
              Agregar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
