import { useNewCrewMemberModal } from '@/app/hooks/components/useNewCrewMemberModal'
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import { FC } from 'react'
import IsOldCrewMemberCase from '.././newCrewMemberModal/isOldCrewMemberCase'
import IsNewCrewMemberCase from '.././newCrewMemberModal/isNewCrewMemberCase'


interface SearchOptionsInterface {
  label: string
  value: string
}

interface NewCrewMemberModalInterface {
  searchOptions: SearchOptionsInterface[]
  loadingOptions: boolean
}

export const NewCrewMemberModal: FC<NewCrewMemberModalInterface> = ({
  searchOptions,
  loadingOptions
}) => {
  const {
    isOpen,
    onOpen,
    closeModal,
    sendData,
    selectedSailor,
    onSelectionChange,
    onInputChange,
    handleRegisterSailorClick,
    newSailor,
    validateSailor,
    awaitResponse,
    fieldState,
    onOpenChangeAutocomplete,
    isNewSailor,
    setNewSailor,
    setSelectedSailor
  } = useNewCrewMemberModal(searchOptions)

  return (
    <>
      <Button onPress={onOpen} isLoading={loadingOptions}>
        Agregar Tripulante
      </Button>

      <Modal isOpen={isOpen} onOpenChange={closeModal}>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            Cargar nuevo tripulante
          </ModalHeader>
          <ModalBody>
            <Autocomplete
              isDisabled={isNewSailor}
              className='w-full'
              inputValue={fieldState.inputValue}
              items={fieldState.items}
              label='Ingrese nombre o número de libreta'
              placeholder='Nombre o ID'
              selectedKey={fieldState.selectedKey}
              variant='bordered'
              onInputChange={onInputChange}
              onOpenChange={onOpenChangeAutocomplete}
              onSelectionChange={onSelectionChange}
              listboxProps={{
                emptyContent: (
                  <p
                    onClick={handleRegisterSailorClick}
                    className='bg-warning-400 text-black font-semibold rounded px-2 py-2 cursor-pointer'
                  >
                    Registrar marinero haciendo click aquí
                  </p>
                )
              }}
            >
              {(item: SearchOptionsInterface) => (
                <AutocompleteItem textValue={item.value} key={item.value}>
                  {item.label}
                </AutocompleteItem>
              )}
            </Autocomplete>

            <div className='mt-4'>
              {isNewSailor ? (
                <IsNewCrewMemberCase
                  newSailor={newSailor}
                  setNewSailor={setNewSailor}
                  fieldState={fieldState}
                />
              ) : (
                <IsOldCrewMemberCase
                  setSelectedSailor={setSelectedSailor}
                  selectedSailor={selectedSailor}
                  fieldState={fieldState}
                />
              )}
            </div>
          </ModalBody>
          <ModalFooter className='flex-col gap-4'>
            <div className='flex gap-4 justify-end'>
              <Button color='danger' onPress={closeModal}>
                Volver atrás
              </Button>
              <Button
                isDisabled={
                  !validateSailor(selectedSailor) && !validateSailor(newSailor)
                }
                isLoading={awaitResponse}
                color='primary'
                onPress={() => sendData(closeModal)}
              >
                {isNewSailor
                  ? 'Registrar y agregar a la tripulación'
                  : 'Agregar a la tripulación'}
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
