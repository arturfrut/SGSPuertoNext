'use client'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import { useState } from 'react'

export default function Modalfr83({
  modalTitle,
  inputPlaceHolder,
  tableDescription,
  setWeatherSteps,
  index,
  weatherSteps
}: {
  modalTitle: string
  inputPlaceHolder: string
  tableDescription: string
  setWeatherSteps: (updatedWeatherSteps: any[]) => void
  index: number
  weatherSteps: any
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [value, setValue] = useState('')

  const onAccept = () => {
    const updatedWeatherSteps = [...weatherSteps]
    if (value !== '') {
      updatedWeatherSteps[index].checked = true
      setWeatherSteps(updatedWeatherSteps)
    }
    onClose()
  }

  return (
    <>
      <Button variant='light' onPress={onOpen}>
        {tableDescription}
      </Button>
      <Modal
        isOpen={isOpen}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                {modalTitle}
              </ModalHeader>
              <ModalBody>
                <Input
                  placeholder={inputPlaceHolder}
                  label={modalTitle}
                  value={value}
                  onValueChange={setValue}
                />
              </ModalBody>
              <ModalFooter>
                <Button color='primary' onClick={onAccept}>
                  Aceptar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
