'use client'

import { useEffect, useState } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import SignModal from '../signModal'
import useSignModal from '../signModal/useSignModal'
import axios from 'axios'
import useGlobalStore from '@/stores/useGlobalStore'
import { useLogout } from '@/app/hooks/useLogout'

export const ModalCreateSign = ({ initialOpen = false }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { signatures, handleSaveSignature } = useSignModal()
  const [awaitResponse, setAwaitResponse] = useState(false)
  const { userData, setUserSign } = useGlobalStore()
  const { handleLogout } = useLogout()

  const submitSign = async onClose => {

    if (!signatures.userSign) {
      alert('Debe ingresar su firma')
      return
    }
    setAwaitResponse(true)
    const apiData = {
      userId: userData.id,
      sign: signatures.userSign
    }
    try {
      await axios.post('/api/register_user_sign', apiData)
      alert('Firma Registrada')
      setAwaitResponse(false)
      setUserSign(signatures?.userSign)
      onClose()
    } catch (error) {
      alert('Error al registrar firma')
      setAwaitResponse(false)
      onClose()
      return
    }
  }

  useEffect(() => {
    if (initialOpen) {
      onOpen()
    }
  }, [initialOpen, onOpen])

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      size='xl'
      backdrop='blur'
      hideCloseButton={true}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Registro de firma
            </ModalHeader>
            <ModalBody>
              <p>
                Para poder usar este sistema es necesario registrar su firma.
              </p>
              <p>
                Esta será utilizada como firma genérica para los documentos a su
                nombre
              </p>
              <p>
                Recuerde que su firma debe ser lo más clara posible para ser
                utilizada en este sistema
              </p>
              <SignModal
                onSave={(data: any) => handleSaveSignature(data, 'userSign')}
                title={
                  signatures?.userSign ? 'Modificar firma' : 'Registrar firma'
                }
              />

              <div className='flex justify-center'>
                {signatures?.userSign ? (
                  <img
                    src={signatures?.userSign}
                    alt=''
                    className='bg-white w-1/2'
                  />
                ) : (
                  <h1>Aún no se cargo ninguna firma</h1>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color='danger' onPress={handleLogout}>
                Cerrar sesión
              </Button>
              <Button
                color='primary'
                isDisabled={!signatures?.userSign}
                onPress={() => submitSign(onClose)}
                isLoading={awaitResponse}
              >
                Registrar firma
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
