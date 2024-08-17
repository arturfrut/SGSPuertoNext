'use client'
import { DateSelectorV2 } from '@/components/dateSelectorV2'
import useFormfp503 from '@/components/hooks/useFormfp503'
import { CrossIcon } from '@/components/icons/crossIcon'
import SignModal from '@/components/signModal'
import { SignatureChecker } from '@/components/signatureChecker'
import { trainingExercises } from '@/constants/strings'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  Image,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea
} from '@nextui-org/react'

export const Formfp503 = () => {
  const {
    createDocumentObject,
    selectedShip,
    formDate,
    setFormDate,
    typeSelect,
    setTypeSelect,
    exerciseSelected,
    setExerciseSelected,
    exerciseDescription,
    setExerciseDescription,
    inputValue,
    setInputValue,
    handleAdd,
    crewInExercise,
    handleSaveSignature,
    signatures,
    removeWitness,
    aditionalInfo,
    setAditionalInfo,
    supervisorSelect,
    setSupervisorSelect,
    handleSupervisorInSelect,
    supervisorSelected,
    setSupervisorSelected,
    crewList,
    supervisorSignSelect
  } = useFormfp503()

  return (
    <Card className='w-full md:w-2/3 md:px-10 md:py-5'>
      <CardHeader className='flex gap-3'>
        <Image
          alt='nextui logo'
          height={40}
          radius='sm'
          src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
          width={40}
        />
        <div className='flex flex-col'>
          <p className='text-xl'>FP - 503 CAPACITACIÓN</p>
        </div>
      </CardHeader>
      <form onSubmit={createDocumentObject}>
        <Divider />
        <CardBody>
          <p className='text-xl '>
            Empresa: {selectedShip.company ?? 'Seleccione barco'}
          </p>
          <p className='mt-4'>
            {' '}
            Barco: {selectedShip.name ?? 'Seleccione barco'}
          </p>
          <p className='mt-4'>OMI: {selectedShip?.idOMI ?? ' - '}</p>
          <p className='my-4'>
            Matricula: {selectedShip.matricula ?? 'Seleccione barco'}
          </p>
          <Divider />

          <DateSelectorV2
            title='Fecha de capacitación'
            date={formDate}
            setDate={setFormDate}
          />

          <p className='text-xl mb-4'>Tipo de capacitación:</p>

          <RadioGroup value={typeSelect} onValueChange={setTypeSelect}>
            <Radio value='Zafarrancho'>Zafarrancho / Ejercicio</Radio>
            <Radio value='Capacitación'>Capacitación</Radio>
          </RadioGroup>
          {typeSelect === 'Zafarrancho' && (
            <div className='flex w-full items-center gap-4'>
              <Select
                isInvalid={typeSelect === 'Zafarrancho' && !exerciseSelected}
                errorMessage='Seleccione ejercicio'
                label='Seleccione Ejercicio'
                className='w-full my-4'
                selectedKeys={exerciseSelected}
                onChange={e => setExerciseSelected(e.target.value)}
              >
                {trainingExercises.map((excercise, index) => (
                  <SelectItem key={excercise.id} value={index}>
                    {excercise.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          )}

          <p className='my-4'>Descripción general y conclusión/resultado:</p>
          <Textarea
            isInvalid={exerciseDescription === ''}
            isRequired
            errorMessage='La descripción es obligatoria'
            value={exerciseDescription}
            onValueChange={setExerciseDescription}
            labelPlacement='outside'
            placeholder='Describa el tema aquí'
          />
          <Divider className='my-4' />
          <p className='text-xl mb-4'>Participantes:</p>
          <div className='flex w-full items-center gap-4'>
            <Input
              size='lg'
              placeholder={'Ingrese nombre y apellido'}
              type='text'
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
            <Button size='lg' onClick={handleAdd}>
              Agregar
            </Button>
          </div>
          <Table aria-label='Example static collection table' isStriped>
            <TableHeader>
              <TableColumn>Tripulante</TableColumn>
              <TableColumn className='w-14'>Firma</TableColumn>
              <TableColumn>Comprendió</TableColumn>
              <TableColumn className='flex justify-end items-center px-8'>
                Eliminar
              </TableColumn>
            </TableHeader>
            <TableBody emptyContent='No hay gente en la lista'>
              {crewInExercise.map((witness, index) => (
                <TableRow key={index} className='cursor-pointer'>
                  <TableCell>{witness?.name}</TableCell>

                  <TableCell>
                    <SignModal
                      onSave={(data: any) =>
                        handleSaveSignature(data, witness?.lastName)
                      }
                      title='FIRMA TRIPULANTE'
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      isSelected={!!signatures?.[witness?.lastName]}
                      isReadOnly
                    />
                  </TableCell>

                  <TableCell
                    className='flex justify-end px-10 h-20 items-center'
                    onClick={() => removeWitness(index)}
                  >
                    <CrossIcon />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Divider className='my-4' />
          <p className='mb-4'> Información adicional</p>
          <Textarea
            labelPlacement='outside'
            placeholder='En caso de querer brindar información adicional escriba aquí'
            value={aditionalInfo}
            onValueChange={setAditionalInfo}
          />
          <Divider className=' my-4' />
          <p className='mb-4'>Encargado de dar la capacitación:</p>
          <RadioGroup
            value={supervisorSelect}
            onValueChange={setSupervisorSelect}
          >
            <Radio value='En tripulación'>En tripulación</Radio>
            <Radio value='Externo'>Externo</Radio>
          </RadioGroup>
          {supervisorSelect === 'En tripulación' && (
            <div className='flex w-full items-center gap-4'>
              <Select
                label='Seleccione Tripulante'
                className='w-full my-4'
                isInvalid={
                  supervisorSelect === 'En tripulación' &&
                  supervisorSelected === ''
                }
                selectedKeys={supervisorSignSelect}
                onChange={e => handleSupervisorInSelect(e)}
                errorMessage='Seleccione encargado'
              >
                {crewList.map(
                  (
                    member: { id?: number; name: string; lastName: string },
                    index: number
                  ) => (
                    <SelectItem key={index} value={index}>
                      {`${member.name} ${member.lastName}`}
                    </SelectItem>
                  )
                )}
              </Select>
            </div>
          )}
          {supervisorSelect === 'Externo' && (
            <div className='flex w-full items-center gap-4 my-4'>
              <Input
                size='lg'
                placeholder={'Ingrese nombre y apellido'}
                value={supervisorSelected}
                onChange={e => setSupervisorSelected(e.target.value)}
              />
            </div>
          )}

          <div className='w-full my-4 md:w-1/2 flex items-center justify-center gap-5'>
            <SignModal
              onSave={(data: any) =>
                handleSaveSignature(data, 'personInChargeSignature')
              }
              title='FIRMA DE PERSONA ENCARGADA'
            />
            <SignatureChecker status={signatures?.personInChargeSignature} />
          </div>
        </CardBody>

        <Divider />
        <CardFooter className=' flex gap-3 justify-end'>
          <Button type='submit'>Enviar</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
