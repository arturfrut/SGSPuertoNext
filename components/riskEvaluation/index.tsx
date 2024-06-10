'use client'
import SignModal from '@/components/signModal'
import useSignModal from '@/components/signModal/useSignModal'
import { SignatureChecker } from '@/components/signatureChecker'
import {
  monthsSelect,
  noteClasification,
  riskEvaluationStatus,
  shipOrCompany,
  yesNoSelect
} from '@/constants/strings'
import { getCurrentDateTime } from '@/utils/dateSelector'
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
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
import { useState } from 'react'
import RiskTableModal from './riskTableModal'
import RiskChip from './RiskChip'
import AddRiskModal from './AddRiskModal'

// TODO Preguntar que es NCN y de donde viene, preguntar si firma puede ir de otra forma, el emisor puede venir por bdd?, preguntar que es PD
// Como se genera NCN?

export const RiskEvaluation = () => {
  const { signatures, handleSaveSignature } = useSignModal()
  const [status, setStatus] = useState(0)
  const [tablesData, setTablesData] = useState({
    firstEvaluation:{
      risks:[]
    },
    secondEvaluation:{
      preventions:[

      ]
    } 
  })

 const RisktableHeaders = [
  'Riesgo', 'Detalle', 'Probabilidad', 'Consecuencia', 'Resultado', 'Requiere medidas', 'Editar', 'Eliminar'
 ]
 const Risks = [
  {
  riskNumber: 'R1',
  riskDetail: 'Riesgo 1',
  probabilty: 'Probabilidad 1',
  consecuency: 'Consecuencia 1',
  result: 'Resultado 1',
  actionRequired: 'Requiere medidas 1'
 },
 {
  riskNumber: 'R2',
  riskDetail: 'Riesgo 1',
  probabilty: 'Probabilidad 1',
  consecuency: 'Consecuencia 1',
  result: 'Resultado 1',
  actionRequired: 'Requiere medidas 1'
 }

 ]


 const generateSecondTable = () => {
  setStatus(1)

 }

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
          <p className='text-xl'>FR-701 EVALUACION Y PREVENCION DE RIESGO</p>
        </div>
      </CardHeader>
      <form>
        <Divider />
        <CardBody>
          <div className='flex flex-col flex-wrap gap-4 w-full'>
            <Breadcrumbs radius={'sm'} variant='solid' size='lg'>
              {riskEvaluationStatus.map((item, index) => (
                <BreadcrumbItem key={index} isCurrent={status === index}>
                  {item}
                </BreadcrumbItem>
              ))}
            </Breadcrumbs>
          </div>
        </CardBody>
        <Divider />
        <CardBody>
          <p className='text-xl my-4'>Paso 1: Primera evaluación de riesgos</p>
          <p className='text-xl my-4'>Buque : viene por bdd</p>
          <p>Lugar del buque donde se realizará el trabajo</p>
          <Input
            className=' my-4 w-full'
            type='string'
            label='Escriba lugar de trabajo'
          />
                    <p className='my-4'>Descripción del trabajo:</p>
          <Textarea
            labelPlacement='outside'
            placeholder='Describa el trabajo aquí'
          />
                  <Table className='my-4' isStriped aria-label='Example static collection table'>
                  <TableHeader>
                    {RisktableHeaders.map((header, index) => (
                      <TableColumn key={index}>{header}</TableColumn>
                    ))}
                  </TableHeader>
                  <TableBody emptyContent={"Sin riesgos agregados"}>
                    {Risks.map(risk => (
                      <TableRow key={risk.riskNumber}>
                        <TableCell>{risk.riskNumber}</TableCell>
                        <TableCell>{risk.riskDetail}</TableCell>
                        <TableCell>{risk.probabilty}</TableCell>
                        <TableCell>{risk.consecuency}</TableCell>
                        <TableCell>{risk.result}</TableCell>
                        <TableCell>{risk.actionRequired}</TableCell>
                        <TableCell>editar</TableCell>
                        <TableCell>eliminar</TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                  </Table>

          <AddRiskModal setTablesData={setTablesData} prevRiskData={null}/>

          <Button className='my-2 md:w-1/2 w-full' onPress={generateSecondTable}>
        Generar tabla de Reevaluación de riesgos
      </Button>

          <p className='my-4'>Nombre:</p>
          <div className='md:flex md:align-items md:gap-4 '>
            <div className='md:w-1/2'>
              <Input
                className='w-full'
                type='string'
                label='Nombre de Empresa/Buque'
              />
              {/* TODO: Arreglar margin en mobile */}
            </div>
            <RadioGroup
              name='shipStatus'
              // onChange={handleShipOrCompany}
              className='md:w-1/2'
            >
              {shipOrCompany.map(option => (
                <Radio key={`shipOrCompany-${option}`} value={option}>
                  {option}
                </Radio>
              ))}
            </RadioGroup>
          </div>

          <div className='w-full md:flex md:gap-4'>
            <div className='md:w-1/2'>
              <p className='my-2'>Emisor:</p>
              <Input
                className='w-full'
                type='string'
                label='Identidad del Emisor'
              />
            </div>
            <div className='md:w-1/2'>
              <p className='my-2'>Fecha</p>
              <div className='flex w-full  flex-nowrap  gap-4'>
                <Input
                  type='number'
                  max={getCurrentDateTime().year + 2}
                  // TODO: No funciona el Max, probar poniendolo como variable de renderizado
                  defaultValue={getCurrentDateTime().year}
                  label='Año'
                />

                <Select label='Mes' value={'Marzo'}>
                  {monthsSelect.map(month => (
                    <SelectItem key={`monthsSelectId-${month}`} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </Select>
                {/* TODO: HACER FUNCIÓN PARA QUE TOME VALOR DEL MES ACTUAL POR DEFECTO */}
                {/* TODO: HACER FUNCIÓN PAR CANTIDAD MÁXIMA DE DÍAS Y QUE SE HABILITE DESPUES DE TENERUN DATO EN EL MES */}
                <Input
                  type='number'
                  max={31}
                  label='Día'
                  defaultValue={getCurrentDateTime().day}
                />
              </div>
            </div>
          </div>
          <p className='my-4'>Evidencia:</p>
          <Textarea
            labelPlacement='outside'
            placeholder='Describa el porque de su nota de no conformidad'
          />
          <div className='w-full md:w-1/2 flex items-center gap-5 my-4'>
            <SignModal
              onSave={(data: any) =>
                handleSaveSignature(data, 'issuerSignature')
              }
              title='FIRMA DEL EMISOR'
            />
            <SignatureChecker status={signatures?.issuerSignature} />{' '}
          </div>
          <Button className='md:w-1/2 mb-4'>Enviar </Button>
          <Divider />
          <p className='text-xl mt-4'>Recepción</p>

          <p className='my-4'>Clasificación:</p>
          <RadioGroup name='shipStatus' className='md:w-1/2'>
            {noteClasification.map(option => (
              <Radio key={`shipOrCompany-${option}`} value={option}>
                {option}
              </Radio>
            ))}
          </RadioGroup>
          <div className='w-full md:flex md:gap-4 mb-4'>
            <div className='md:w-1/2'>
              <p className='my-4'>Fecha de entrega PD</p>
              <div className='flex w-full  flex-nowrap  gap-4'>
                <Input
                  type='number'
                  max={getCurrentDateTime().year + 2}
                  // TODO: No funciona el Max, probar poniendolo como variable de renderizado
                  defaultValue={getCurrentDateTime().year}
                  label='Año'
                />

                <Select label='Mes' value={'Marzo'}>
                  {monthsSelect.map(month => (
                    <SelectItem key={`monthsSelectId-${month}`} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </Select>
                {/* TODO: HACER FUNCIÓN PARA QUE TOME VALOR DEL MES ACTUAL POR DEFECTO */}
                {/* TODO: HACER FUNCIÓN PAR CANTIDAD MÁXIMA DE DÍAS Y QUE SE HABILITE DESPUES DE TENERUN DATO EN EL MES */}
                <Input
                  type='number'
                  max={31}
                  label='Día'
                  defaultValue={getCurrentDateTime().day}
                />
              </div>
            </div>
            <div className='md:w-1/2'>
              <p className='my-4'>Fecha de salida PD</p>
              <div className='flex w-full  flex-nowrap  gap-4'>
                <Input
                  type='number'
                  max={getCurrentDateTime().year + 2}
                  // TODO: No funciona el Max, probar poniendolo como variable de renderizado
                  defaultValue={getCurrentDateTime().year}
                  label='Año'
                />

                <Select label='Mes' value={'Marzo'}>
                  {monthsSelect.map(month => (
                    <SelectItem key={`monthsSelectId-${month}`} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </Select>
                {/* TODO: HACER FUNCIÓN PARA QUE TOME VALOR DEL MES ACTUAL POR DEFECTO */}
                {/* TODO: HACER FUNCIÓN PAR CANTIDAD MÁXIMA DE DÍAS Y QUE SE HABILITE DESPUES DE TENERUN DATO EN EL MES */}
                <Input
                  type='number'
                  max={31}
                  label='Día'
                  defaultValue={getCurrentDateTime().day}
                />
              </div>
            </div>
          </div>
          <div className='w-full md:w-1/2 flex items-center gap-5 my-4'>
            <SignModal
              onSave={(data: any) =>
                handleSaveSignature(data, 'issuerSignature')
              }
              title='FIRMA DEL EMISOR'
            />
            <SignatureChecker status={signatures?.issuerSignature} />
          </div>
          <Button className='md:w-1/2 mb-4'>Enviar </Button>

          <Divider />
          <p className='text-xl mt-4'>Acción:</p>

          <p className='my-4'>Responsable de la acción correctiva:</p>
          <Input
            className='w-full'
            type='string'
            label='Nombre y apellido del responsable'
          />
          <p className='my-4'>Sector afectado</p>
          <Input className='w-full' type='string' label='Nombre del sector' />

          <p className='my-4'>Acción correctiva:</p>
          <Textarea labelPlacement='outside' placeholder='Describa la acción' />
          <div className='md:w-1/2'>
            <p className='my-4'>Fecha implementación prevista</p>
            <div className='flex w-full  flex-nowrap  gap-4'>
              <Input
                type='number'
                max={getCurrentDateTime().year + 2}
                // TODO: No funciona el Max, probar poniendolo como variable de renderizado
                defaultValue={getCurrentDateTime().year}
                label='Año'
              />

              <Select label='Mes' value={'Marzo'}>
                {monthsSelect.map(month => (
                  <SelectItem key={`monthsSelectId-${month}`} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </Select>
              {/* TODO: HACER FUNCIÓN PARA QUE TOME VALOR DEL MES ACTUAL POR DEFECTO */}
              {/* TODO: HACER FUNCIÓN PAR CANTIDAD MÁXIMA DE DÍAS Y QUE SE HABILITE DESPUES DE TENERUN DATO EN EL MES */}
              <Input
                type='number'
                max={31}
                label='Día'
                defaultValue={getCurrentDateTime().day}
              />
            </div>
          </div>
          <p className='my-4'>Cumplimiento</p>
          <div className='md:flex md:items-center md:flex-row-reverse md:gap-4'>
            <div className='md:w-1/2'>
              <RadioGroup name='shipStatus' className='md:w-1/2' value='No'>
                {/* TODO: ARREGLAR MARGIN */}
                {yesNoSelect.map(option => (
                  <Radio key={`shipOrCompany-${option}`} value={option}>
                    {option}
                  </Radio>
                ))}
              </RadioGroup>
            </div>
            <div className='md:w-1/2'>
              <div className='flex w-full  flex-nowrap  gap-4'>
                <Input
                  type='number'
                  max={getCurrentDateTime().year + 2}
                  // TODO: No funciona el Max, probar poniendolo como variable de renderizado
                  defaultValue={getCurrentDateTime().year}
                  label='Año'
                />

                <Select label='Mes' value={'Marzo'}>
                  {monthsSelect.map(month => (
                    <SelectItem key={`monthsSelectId-${month}`} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </Select>
                {/* TODO: HACER FUNCIÓN PARA QUE TOME VALOR DEL MES ACTUAL POR DEFECTO */}
                {/* TODO: HACER FUNCIÓN PAR CANTIDAD MÁXIMA DE DÍAS Y QUE SE HABILITE DESPUES DE TENERUN DATO EN EL MES */}
                <Input
                  type='number'
                  max={31}
                  label='Día'
                  defaultValue={getCurrentDateTime().day}
                />
              </div>
            </div>
          </div>
          <p className='my-4'>Acción correctiva eficaz?</p>
          <RadioGroup name='shipStatus' className='md:w-1/2'>
            {/* TODO: ARREGLAR MARGIN */}
            {yesNoSelect.map(option => (
              <Radio key={`shipOrCompany-${option}`} value={option}>
                {option}
              </Radio>
            ))}
          </RadioGroup>
          <p className='my-4'>Observaciones:</p>
          <Textarea labelPlacement='outside' placeholder='Describa la acción' />
          <div className='md:flex md:gap-5'>
            <div className='w-full md:w-1/2 flex items-center gap-5'>
              <SignModal
                onSave={(data: any) => handleSaveSignature(data, 'ACSignature')}
                title='FIRMA RESPONSABLE DE LA A.C'
              />
              <SignatureChecker status={signatures?.ACSignature} />
            </div>
            <div className='w-full md:w-1/2 flex items-center gap-5'>
              <SignModal
                onSave={(data: any) =>
                  handleSaveSignature(data, 'sgsSignature')
                }
                title='FIRMA RESPONSABLE SGS'
              />
              <SignatureChecker status={signatures?.sgsSignature} />
            </div>
          </div>
        </CardBody>

        <Divider />
        <CardFooter className=' flex gap-3 justify-end'>
          {/* <ModalFR802 formData={ } /> */}
          <Button> Modal de confirmación</Button>
          {/* TODO: EN V2 AGREGAR BOTÓN DE RESET EN FORMULARIOS */}
        </CardFooter>
      </form>
    </Card>
  )
}
