import useGlobalStore from '@/stores/useGlobalStore'
import { useDisclosure } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useFilter } from '@react-aria/i18n' // Para el filtrado de opciones
import axios from 'axios'

interface NewSailorInterface {
  sailor_book_number: string // recordar parsear
  name: string
  celNumber: string // recordar parsear
  charge: string
}

export const useNewCrewMemberModal = searchOptions => {
  useEffect(() => {
    if (searchOptions?.length) {
      setFieldState(prevState => ({
        ...prevState,
        items: searchOptions
      }))
    }
  }, [searchOptions])

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  // Hook para manejar la lógica de filtrado
  const { startsWith } = useFilter({ sensitivity: 'base' })
  const { setTripulation, tripulation, userId, selectedShip } = useGlobalStore()
  const [awaitResponse, setAwaitResponse] = useState(false)
  const [newSailor, setNewSailor] = useState<NewSailorInterface>({
    sailor_book_number: '',
    name: '',
    celNumber: '',
    charge: ''
  })

  const validateSailor = (sailor): boolean => {
    if (sailor) {
      return Object.values(sailor).every(
        value => value !== '' && value !== null && value !== undefined
      )
    }
  }

  const closeModal = () => {
    setIsNewSailor(false)
    setSelectedSailor({
      name: '',
      id: '',
      charge: ''
    })
    setNewSailor({
      sailor_book_number: '',
      name: '',
      celNumber: '',
      charge: ''
    })
    setAwaitResponse(false)
    onOpenChange()
  }

  const sendData = async (closeModal: () => void) => {
    if (
      tripulation.find(
        member => member.sailor_book_number === parseInt(selectedSailor.id)
      )
    ) {
      alert('El marinero ya se encuentra en la tripulación')
      return
    } else if (isNewSailor) {
      const newSailorForApi = {
        sailor_book_number: parseInt(newSailor.sailor_book_number.trim()),
        cel_number: newSailor.celNumber,
        name: newSailor.name,
        charge: newSailor.charge,
        charged_by: userId,
        actual_ship: selectedShip.idOMI,
        boarding_history: [
          {
            board_date: new Date().toISOString(),
            ship_id_omi: selectedShip.idOMI,
            charge: newSailor.charge
          }
        ]
      }

      const newSailorForState = {
        sailor_book_number: parseInt(newSailor.sailor_book_number),
        name: newSailor.name,
        rol: newSailor.charge
      }

      setAwaitResponse(true)
      try {
        await axios.post('/api/register_sailor', newSailorForApi)
        setTripulation([...tripulation, newSailorForState])
        alert('Marinero registrado y agregado a la tripulación')
      } catch (error) {
        alert('Error al registrar nuevo marinero')
        setAwaitResponse(false)
        return
      }
      setAwaitResponse(false)
    } else {
      const modifySailor = {
        sailor_book_number: parseInt(selectedSailor.id),
        name: selectedSailor.name,
        actual_ship: selectedShip.idOMI,
        charge: selectedSailor.charge
      }
      setTripulation([
        ...tripulation,
        {
          name: selectedSailor.name,
          sailor_book_number: parseInt(selectedSailor.id),
          rol: selectedSailor.charge
        }
      ])
      setAwaitResponse(true)
      try {
        await axios.put('/api/modify_sailor', modifySailor)
        setTripulation([...tripulation, modifySailor])
        alert('Marinero agregado a la tripulación')
      } catch (error) {
        setAwaitResponse(false)
        alert('Error al registrar marinero')
        return
      }
      setAwaitResponse(false)
    }

    closeModal()
  }

  // Estado para manejar la selección del marinero
  const [selectedSailor, setSelectedSailor] = useState<{
    name: string
    id: string
    charge: string
  } | null>(null)

  // Estado para manejar el valor del campo y los elementos filtrados
  const [fieldState, setFieldState] = useState({
    selectedKey: null as React.Key | null,
    inputValue: '',
    items: searchOptions
  })

  const [isNewSailor, setIsNewSailor] = useState(false)

  // Filtrar marineros por nombre o ID
  const filterSailors = (input: string) => {
    const inputLower = input.toLowerCase()
    return searchOptions.filter(
      sailor =>
        startsWith(sailor.label, inputLower) ||
        sailor.value.toString().startsWith(inputLower)
    )
  }

  // Manejar la selección del marinero
  const onSelectionChange = (key: React.Key) => {
    const selectedItem = searchOptions.find(sailor => sailor.value === key)
    if (selectedItem) {
      setSelectedSailor({
        name: selectedItem.label,
        id: selectedItem.value,
        charge: ''
      })
      setFieldState(prevState => ({
        ...prevState,
        inputValue: selectedItem.label,
        selectedKey: key,
        items: filterSailors(selectedItem.label)
      }))
    }
  }

  // Manejar los cambios en el campo de entrada
  const onInputChange = (value: string) => {
    setFieldState(prevState => ({
      ...prevState,
      inputValue: value,
      selectedKey: value === '' ? null : prevState.selectedKey,
      items: filterSailors(value)
    }))
    console.log(fieldState)
    console.log(!!fieldState.items.length)
  }

  // Mostrar la lista completa si el menú se abre manualmente
  const onOpenChangeAutocomplete = (isOpen: boolean, menuTrigger: any) => {
    if (menuTrigger === 'manual' && isOpen) {
      setFieldState(prevState => ({
        ...prevState,
        items: searchOptions
      }))
    }
  }

  const handleRegisterSailorClick = () => {
    setIsNewSailor(true)
    setFieldState(prevState => ({
      ...prevState,
      inputValue: '', // Opcional: Limpia el campo de entrada si es necesario
      selectedKey: null // Opcional: Limpia la selección previa
    }))
    setNewSailor({
      sailor_book_number: '',
      name: fieldState.inputValue,
      celNumber: '',
      charge: ''
    })
    onOpenChangeAutocomplete(false, 'auto') // Cierra el Autocomplete manualmente
  }

  return {
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
  }
}
