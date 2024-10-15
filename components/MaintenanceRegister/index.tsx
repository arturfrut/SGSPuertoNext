'use client'

import { useMaintenanceRegister } from '@/app/hooks/components/useMaintenanceRegister'
// FALTA CORREGIR PARA QUE EN CASO DE SUPERPOSICIÓN TOME SOLO EL ÚLTIMO

import { SignatureChecker } from '@/components/signatureChecker'
import SignModal from '@/components/signModal'

// import { parseAbsoluteToLocal, getHoursBetween } from '@internationalized/date'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  Divider,
  Image,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, Key } from 'react'

export const MaintenanceRegister = () => {
  const {
    signatures,
    handleSaveSignature,
    handleMotorChange,
    groupedData,
    handleSubmit,
    handleTimeChange,
    handleDateChange,
    motorData
  } = useMaintenanceRegister()

  return (
    <Card className='w-full  md:px-10 md:py-5'>
      <CardHeader className='flex gap-3'>
        <Image
          alt='nextui logo'
          height={40}
          radius='sm'
          src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
          width={40}
        />
        <div className='flex flex-col'>
          <p className='text-xl'>Nuevo registro de mantenimiento</p>
        </div>
      </CardHeader>
      <Divider className='mb-4' />
      <CardBody>
        <div className='flex flex-col gap-5'>
          <Card className='w-full'>
            <CardBody>
              <Table className='w-1/2'>
                <TableHeader>
                  <TableColumn className='w-6/12'> </TableColumn>
                  <TableColumn>Ultima carga</TableColumn>
                  <TableColumn className='w-2/12'>Nueva carga</TableColumn>
                </TableHeader>
                <TableBody emptyContent='Cargando data'>
                  {motorData.map((item, index) => (
                    <TableRow key={index}>
                      {/* <TableCell className='' css={{ backgroundColor: "#27272a", color: "white" }}> */}
                      <TableCell className='bg-[#27272a] w-6/12'>
                        HORAS {item.description}:
                      </TableCell>
                      <TableCell className='w-2/12'>
                        {item.actualhours}
                      </TableCell>
                      <TableCell className='w-60'>
                        <Input
                          type='number'
                          value={String(item.newCharge)}
                          onChange={e =>
                            handleMotorChange(e.target.value, item.description)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {Object.keys(groupedData).map((block, blockIndex) => (
                <div key={blockIndex}>
                  <h3>{block}</h3>
                  <Table aria-label={`Table for ${block}`} className='w-full'>
                    <TableHeader>
                      <TableColumn>Item</TableColumn>
                      <TableColumn>Descripción</TableColumn>
                      <TableColumn>Frecuecia</TableColumn>
                      <TableColumn>Fecha recorrido</TableColumn>
                      <TableColumn>Hrs recorrido al recorrido</TableColumn>
                      <TableColumn>Hrs próximo recorrido</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent='Cargando data'>
                      
                      {
                                            // @ts-ignore

                      groupedData[block].map((row: { description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; frecuency: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; routeDate: any; recommendation: string | undefined; routeTime: any; nextRouteTime: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined }, index: Key | null | undefined) => (
                        <TableRow key={index}>
                          <TableCell>{index as number + 1}</TableCell>
                          <TableCell>{row.description}</TableCell>
                          <TableCell>{row.frecuency}</TableCell>
                          <TableCell>
                            <DatePicker
                              hideTimeZone={true}
                              hourCycle={24}
                              granularity='hour'
                              className='max-w-md'
                              label='Date'
                              value={row.routeDate}
                              onChange={date => handleDateChange(date, index as number)}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type='number'
                              placeholder={row.recommendation}
                              value={row.routeTime ?? ''}
                              onChange={e =>
                                handleTimeChange(e.target.value, index as number)
                              }
                            />
                          </TableCell>
                          <TableCell>{row.nextRouteTime}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
        <div className='w-full flex justify-end'>
          <div className='flex items-center gap-5'>
            <SignModal
              onSave={(data: any) => handleSaveSignature(data, 'registerSign')}
              title='Firma Tripulante'
            />
            <SignatureChecker status={signatures?.registerSign} />
            <Button color='primary' onPress={handleSubmit}>
              Enviar Data
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
