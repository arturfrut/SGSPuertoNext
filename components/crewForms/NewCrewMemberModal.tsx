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
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import Link from 'next/link'
import { useState } from 'react'

export const NewCrewMemberModal = (searchOptions : []) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [value, setValue] = useState("cat");

  isOpen && console.log(searchOptions)
  const animals = [
    {
      label: 'Cat',
      value: 'cat',
      description: 'The second most popular pet in the world'
    },
    {
      label: 'Dog',
      value: 'dog',
      description: 'The most popular pet in the world'
    }
  ]

  return (
    <>
      <Button onPress={onOpen}>Agregar Tripulante</Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Cargar nuevo tripulante{' '}
              </ModalHeader>
              <ModalBody>
                <p>Buscar Marinero en Base de datos</p>

                <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
                  <Autocomplete
                    label='Favorite Animal'
                    placeholder='Search an animal'
                    className='max-w-xs'
                    defaultItems={animals}
                    selectedKey={value}
                    onSelectionChange={setValue}
                    listboxProps={{
                      emptyContent: 'Agregar marinero'
                    }}
                  >
                    {item => (
                      <AutocompleteItem key={item.value}>
                        {item.label}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                </div>
              </ModalBody>
              <ModalFooter>
                <Link href='/crewForms' passHref>
                  <Button
                    as='a'
                    color='danger'
                    variant='light'
                    onPress={onClose}
                  >
                    Volver atrás
                  </Button>
                </Link>

                <Button color='primary' onPress={onClose}>
                  Agregar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
