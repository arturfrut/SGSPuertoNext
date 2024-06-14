'use client'
import useSignModal from '@/components/signModal/useSignModal'
import { riskEvaluationStatus } from '@/constants/strings'
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
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea
} from '@nextui-org/react'
import { useState } from 'react'
import AddRiskModal from './AddRiskModal'


export const RiskEvaluation = () => {
  const [tablesData, setTablesData] = useState({
    firstEvaluation: {
      risks: []
    },
    secondEvaluation: {
      preventions: []
    }
  })

  const riskTableHeaders = [
    'Riesgo',
    'Detalle',
    'Probabilidad',
    'Consecuencia',
    'Resultado',
    'Requiere medidas'
  ]
  const preventionTableHeaders = [
    'Riesgo',
    'Detalle',
    'Medida a realizar',
    'Probabilidad',
    'Consecuencia',
    'Resultado',
    'Requiere medidas'
  ]

  const generateSecondTable = () => {
    const risksWithAction = tablesData.firstEvaluation.risks.filter(
      risk => risk.actionRequired
    )
    const risksWithActionRequired = risksWithAction.map(risk => ({
      ...risk,
      preventionAction: null
    }))

    setTablesData(prevState => ({
      ...prevState,
      secondEvaluation: {
        ...prevState.secondEvaluation,
        preventions: [
          ...prevState.secondEvaluation.preventions,
          ...risksWithActionRequired
        ]
      }
    }))

    !risksWithAction.length && alert('No es necesario tomar acciones!')
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
          <Table
            className='my-4'
            isStriped
            aria-label='Example static collection table'
          >
            <TableHeader>
              {riskTableHeaders.map((header, index) => (
                <TableColumn key={index}>{header}</TableColumn>
              ))}
            </TableHeader>
            <TableBody emptyContent={'Sin riesgos agregados'}>
              {/* TODO: */}
              {tablesData.firstEvaluation?.risks.map(risk => (
                <TableRow key={risk.riskNumber}>
                  <TableCell>{risk.riskNumber}</TableCell>
                  <TableCell>{risk.riskDetail}</TableCell>
                  <TableCell>{risk.probability}</TableCell>
                  <TableCell>{risk.consequence}</TableCell>
                  <TableCell>{risk.result.description}</TableCell>
                  <TableCell>{risk.actionRequired ? 'SI' : 'NO'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <AddRiskModal
            setTablesData={setTablesData}
            prevRiskData={tablesData}
          />

          <Button
            className='my-2 md:w-1/2 w-full'
            onPress={generateSecondTable}
          >
            Generar tabla de Reevaluación de riesgos
          </Button>

          {tablesData.secondEvaluation.preventions.length && (
            <Table
              className='my-4'
              isStriped
              aria-label='Example static collection table'
            >
              <TableHeader>
                {preventionTableHeaders.map((header, index) => (
                  <TableColumn key={index}>{header}</TableColumn>
                ))}
              </TableHeader>
              <TableBody emptyContent={'Sin prevenciones'}>
                {/* TODO: */}
                {tablesData.secondEvaluation?.preventions.map(risk => (
                  <TableRow key={risk.riskNumber}>
                    <TableCell>{risk.riskNumber}</TableCell>
                    <TableCell>{risk.riskDetail}</TableCell>
                    <TableCell>{risk.preventionAction}</TableCell>
                    <TableCell>{risk.probability}</TableCell>
                    <TableCell>{risk.consequence}</TableCell>
                    <TableCell>{risk.result.description}</TableCell>
                    <TableCell>{risk.actionRequired ? 'SI' : 'NO'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
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
