'use client'
import ModalFormSend from '@/components/captainForms/form501/modalFormSend'
import { cardinalDirections, seaCurrentPower, seaPower, windPower } from '@/constants/strings'
import { crewListMock } from '@/mocks/crewListMock'
import { shipMock } from '@/mocks/shipMock'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  Divider,
  Image,
  Input,
  Select,
  SelectItem
} from '@nextui-org/react'
import Link from 'next/link'

export const FormReports = () => {
  const ship = shipMock
  const crewList = crewListMock
  return (
    <Card className='w-full'>
      <CardHeader className='flex gap-3'>
        <Image
          alt='nextui logo'
          height={40}
          radius='sm'
          src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
          width={40}
        />
        <div className='flex flex-col'>
          <p className='text-md'>
            FR-802 RREPORTE DE ACCIDENTE y CUASIACCIDENTE
          </p>
          {/* TODO: FR-802 DEBERÍA ESTAR EN NEGRITA O ALGO ASI  */}
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        {/* TODO: Quiero que en desktop esten los dos en una linea y en mobile uno sobre el otro, admás los labels deberían tener más weight */}
        <p>Buque: {ship.shipName} </p>
        <p>Nro: {ship.shipNumber} </p>
      </CardBody>
      <Divider />
      <CardBody>
        <p>Tipo de Accidente</p>
        <CheckboxGroup>
          <Checkbox value={'Daños al buque'}>Daños al buque</Checkbox>
          <Checkbox value={'Daños a terceros'}>Daños a terceros</Checkbox>
          <Checkbox value={'Daños al medio ambiente'}>
            Daños al medio ambiente
          </Checkbox>
          <Checkbox value={'Hecho potencialmente peligroso'}>
            Hecho potencialmente peligroso
          </Checkbox>
          <Checkbox value={'Accidente personal grave/leve'}>
            Accidente personal grave/leve
          </Checkbox>
        </CheckboxGroup>
      </CardBody>
      <Divider />
      <CardBody>
        <p>Descripción del acontecimiento</p>
        <p>Fecha</p>
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
          <Input type='number' max={24} label='Día' />
          <Input type='email' label='Aca debería ir un select' />
          <Input type='number' label='Año' />
        </div>
        <p>Hora</p>
        <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
          <Input type='number' max={24} label='Hora' />
          <Input type='email' label='Minutos' />
        </div>
        <p>Lugar:</p>
        <Input type='email' label='Indique lugar' />
        <p>Tripulante L.E</p>
        <Select
          label='Seleccione un tripulante de la lista'
          className='max-w-xs'
        >
          {crewList.map(member => (
            <SelectItem key={member.id} value={member.id}>
              {`${member.name} ${member.lastName}`}
            </SelectItem>
          ))}
        </Select>
      </CardBody>
      <Divider />
      <CardBody>
        <p>Testigos:</p>
        <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
          <Select label='Seleccione Tripulante' className='max-w-xs'>
            {crewList.map(member => (
              <SelectItem key={member.id} value={member.id}>
                {`${member.name} ${member.lastName}`}
              </SelectItem>
            ))}
          </Select>
          <Button>Agregar testigo</Button>
        </div>
        <p>Lista de testigos agregados:</p>
        <p>No hubieron testigos -render condicional -</p>
      </CardBody>
      <Divider />
      <CardBody>
        <p>Condición del buque</p>
        <CheckboxGroup>
          <Checkbox value={'En navegación'}>En navegación</Checkbox>
          <Checkbox value={'Maniobra puerto'}>Maniobra puerto</Checkbox>
          <Checkbox value={'Alijo'}>Alijo</Checkbox>
          <Checkbox value={'Carga/descarga'}>Carga/descarga</Checkbox>
          <Checkbox value={'Calado proa'}>Calado proa</Checkbox>
          <Checkbox value={'Calado popa'}>Calado popa</Checkbox>
        </CheckboxGroup>
        <p>
          Fondeado - radiobutton si no CONDICIÓN DEL BUQUE DEBERÏAN SER
          RADIOBUTTONS
        </p>
        <Input type='email' label='Otras circunstancias...' />
      </CardBody>
      <Divider />
      <CardBody>
        <p>Condiciones hidrometeorológicas</p>
        <p>Viento - Deberían estar las dos en una linea</p>
        <Select label='Fuerza' className='max-w-xs'>
          {windPower.map(power => (
            <SelectItem key={`windPower-${power}`} value={power}>
              {power}
            </SelectItem>
          ))}
        </Select>
        <Select label='Dirección' className='max-w-xs'>
          {cardinalDirections.map(direction => (
            <SelectItem key={`windDirection-${direction}`} value={direction}>
              {direction}
            </SelectItem>
          ))}
        </Select>
        <p>Mar - Deberían estar las dos en una linea</p>
        <Select label='Fuerza' className='max-w-xs'>
          {seaPower.map(power => (
            <SelectItem key={`seaPower-${power}`} value={power}>
              {power}
            </SelectItem>
          ))}
        </Select>
        <Select label='Dirección' className='max-w-xs'>
          {cardinalDirections.map(direction => (
            <SelectItem key={`seaDirection-${direction}`} value={direction}>
              {direction}
            </SelectItem>
          ))}
        </Select>
        <p>Corriente - Deberían estar las dos en una linea</p>
        <Select label='Fuerza' className='max-w-xs'>
          {seaCurrentPower.map(power => (
            <SelectItem key={`seaCurrentPower-${power}`} value={power}>
              {power}
            </SelectItem>
          ))}
        </Select>
        <Select label='Dirección' className='max-w-xs'>
          {cardinalDirections.map(direction => (
            <SelectItem key={`seaCurrentDirection-${direction}`} value={direction}>
              {direction}
            </SelectItem>
          ))}
        </Select>
        <p>Altura de la marea</p>
        <Input type='email' label='Ingrese altura en mts' />
      </CardBody>
      <Divider />
      <CardBody>
        <p>Derrame de hidrocarburos Radiobutton condicional</p>
        <CheckboxGroup>
          <Checkbox value={'En navegación'}>Si</Checkbox>
          <Checkbox value={'Maniobra puerto'}>No</Checkbox>
        </CheckboxGroup>
        <p>
          Fondeado - radiobutton si no CONDICIÓN DEL BUQUE DEBERÏAN SER
          RADIOBUTTONS
        </p>
        <Input type='email' label='Otras circunstancias...' />
      </CardBody>
      <Divider />
      <CardFooter>
        <div className=' flex gap-3 justify-end'>
          <ModalFormSend />
          <Link href={'/captainForms'}>
            <Button> Cancelar</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
