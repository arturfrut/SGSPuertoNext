import { CrossIcon } from '@/components/icons/crossIcon'
import {
  CardBody,
  Select,
  SelectItem,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from '@nextui-org/react'
import {
  SetStateAction,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useState
} from 'react'
// @ts-ignore
const WitnessesComponent = ({ tripulation, accidentData, setAccidentData }) => {
  const [selectedWitnessId, setSelectedWitnessId] = useState('')

  // Maneja la selección en el Select
  const handleSelectChange = (e: {
    target: { value: SetStateAction<string> }
  }) => {
    setSelectedWitnessId(e.target.value) // Actualiza el ID del testigo seleccionado
  }

  // Agrega el testigo al hacer clic en "Agregar"
  const addWitness = () => {
    const selectedMember = tripulation.find(
      (member: { sailor_book_number: number }) =>
        member.sailor_book_number === parseInt(selectedWitnessId)
    )

    if (
      selectedMember &&
      !accidentData.whitnessIds.includes(selectedMember.sailor_book_number)
    ) {
      setAccidentData((prevData: { whitness: any; whitnessIds: any }) => ({
        ...prevData,
        whitness: [...prevData.whitness, { name: selectedMember.name }],
        whitnessIds: [
          ...prevData.whitnessIds,
          selectedMember.sailor_book_number
        ]
      }))
      setSelectedWitnessId('') // Resetea la selección
    }
  }

  // Elimina el testigo al hacer clic en la fila
  const removeWitness = (sailor_book_number: any) => {
    setAccidentData((prevData: { whitness: any[]; whitnessIds: any[] }) => ({
      ...prevData,
      whitness: prevData.whitness.filter(
        (_: any, index: string | number) =>
          prevData.whitnessIds[index as number] !== sailor_book_number
      ),
      whitnessIds: prevData.whitnessIds.filter(
        (id: any) => id !== sailor_book_number
      )
    }))
  }

  return (
    <CardBody>
      <p className='text-xl pb-4'>Testigos:</p>
      <div className='flex w-full items-center gap-4'>
        <Select
          label='Seleccione Tripulante'
          className='w-full my-4'
          onChange={handleSelectChange}
          value={selectedWitnessId}
        >
          {tripulation.map(
            (member: {
              sailor_book_number:
                | string
                | number
                | readonly string[]
                | undefined
              name:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | ReactFragment
                | ReactPortal
                | null
                | undefined
            }) => (
              // @ts-ignore
              <SelectItem
                  // @ts-ignore

                key={member?.sailor_book_number}
                value={member.sailor_book_number}
              >
                {member.name}
              </SelectItem>
            )
          )}
        </Select>
        <Button onClick={addWitness} size='lg'>
          Agregar
        </Button>
      </div>
      <Table aria-label='Example static collection table' isStriped>
        <TableHeader>
          <TableColumn>Nombre</TableColumn>
          <TableColumn className='flex justify-end items-center px-8'>
            Eliminar
          </TableColumn>
        </TableHeader>
        <TableBody emptyContent={'No hay testigos'}>
          {accidentData?.whitness?.map(
            (
              witness: {
                name:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | ReactFragment
                  | ReactPortal
                  | null
                  | undefined
              },
              index: Key | null | undefined
            ) => (
              <TableRow
                key={index}
                className='cursor-pointer'
                onClick={() => removeWitness(accidentData.whitnessIds[index as number])}
              >
                <TableCell>{witness.name}</TableCell>
                <TableCell className='flex justify-end px-10'>
                  <CrossIcon />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </CardBody>
  )
}

export default WitnessesComponent
