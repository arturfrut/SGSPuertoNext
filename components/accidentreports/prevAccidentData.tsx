import { Accident } from '@/app/hooks/useAccidentsByShip'
import { FC } from 'react'

interface PrevAccidentData {
  accidentData: Accident
}

const PrevAccidentData: FC<PrevAccidentData> = ({ accidentData }) => (
  <>
    <div className='flex gap-1'>
      <p className='font-semibold'>Barco:</p>
      <p className='font-normal'>{accidentData.shipData.ship_name}</p>
    </div>
    <div className='flex gap-1'>
      <p className='font-semibold'>Empresa:</p>
      <p className='font-normal'>{accidentData.shipData.company}</p>
    </div>
    <div className='flex gap-1'>
      <p className='font-semibold'>Reporte creado por :</p>
      <p className='font-normal'>{accidentData.chargedByData.name}</p>
    </div>
    <div className='flex gap-1'>
      <p className='font-semibold'>Tipo de accidente:</p>
      {accidentData.accident_type.map((element, index) => (
        <span className='font-normal' key={index}>
          {element}
          {index !== accidentData.accident_type.length - 1 && ', '}
        </span>
      ))}
    </div>

    <div className='flex gap-1'>
      <p className='font-semibold'>Fecha del accidente:</p>
      <p className='font-normal'>{accidentData.date}</p>
    </div>
    <div className='flex gap-1'>
      <p className='font-semibold'>Lugar del accidente:</p>
      <p className='font-normal'>{accidentData.place}</p>
    </div>
    <div className='flex gap-1'>
      <p className='font-semibold'>LE:</p>
      <p className='font-normal'>{accidentData.le_id_name}</p>
    </div>

    <div className='flex gap-1'>
      <p className='font-semibold'>Condición del barco:</p>
      <p className='font-normal'>{accidentData.ship_condition}</p>
    </div>
    <div className='flex gap-1'>
      <p className='font-semibold'>Testigos:</p>
      {accidentData.whitness_names.length ? (
        <div>
          {accidentData.whitness_names.map((element, index) => (
            <span className='font-normal' key={index}>
              {element}
              {index !== accidentData.whitness_names.length - 1 && ', '}
            </span>
          ))}
        </div>
      ) : (
        <p>Sin testigos</p>
      )}
    </div>
    <div className='flex gap-1'>
      <p className='font-semibold'>Condición del barco:</p>
      <p className='font-normal'>{accidentData.ship_condition}</p>
    </div>
    <p className='font-semibold'>Condiciones hidrometeorológicas</p>
    <div className='flex gap-1'>
      <p className='font-semibold'>Fuerza del viento: </p>
      <p>{accidentData.wind_power}</p>
    </div>
    <div className='flex gap-1'>
      <p className='font-semibold'>Direccion del viento: </p>
      <p>{accidentData.wind_direction}</p>
    </div>
    <div className='flex gap-1'>
      <p className='font-semibold'>Fuerza del mar: </p>
      <p>{accidentData.sea_power}</p>
    </div>
    <div className='flex gap-1'>
      <p className='font-semibold'>Dirección del mar: </p>
      <p>{accidentData.sea_direction}</p>
    </div>
    <div className='flex gap-1'>
      <p className='font-semibold'>Fuerza de la corriente: </p>
      <p>{accidentData.sea_current_power}</p>
    </div>
    <div className='flex gap-1'>
      <p className='font-semibold'>Dirección de la corriente: </p>
      <p>{accidentData.sea_current_direction}</p>
    </div>
    <div className='flex gap-1'>
      <p className='font-semibold'>Altura de la marea/ola: </p>
      <p>{accidentData.sea_height}</p>
    </div>
    <div className='flex gap-1'>
      <p className='font-semibold'>Hubo derrame de hidrocarburos: </p>
      <p>{accidentData.hc ? 'Si' : 'No'}</p>
    </div>

    {accidentData.hc && (
      <>
        <div className='flex gap-1'>
          <p className='font-semibold'>Tipo de derrame: </p>
          <p>{accidentData.hc_type}</p>
        </div>
        <div className='flex gap-1'>
          <p className='font-semibold'>Cantidad de litros: </p>
          <p>{accidentData.hc_lts}</p>
        </div>
        <div className='flex gap-1'>
          <p className='font-semibold'>Medidas adoptadas: </p>
          <p>{accidentData.hc_actions}</p>
        </div>
      </>
    )}
    <div className='flex gap-1'>
      <p className='font-semibold'>
        Verificaciones realizadas en el acontecimiento:{' '}
      </p>
      <p>{accidentData.verifications}</p>
    </div>
    <div className='flex gap-1'>
      <p className='font-semibold'>
        Opinión del capitán/compañía sobre las medidas correctivas a aplicar:{' '}
      </p>
      <p>{accidentData.capitan_opinions}</p>
    </div>
    <div className='flex gap-1'>
      <p className='font-semibold'>
        Corresponde reunión con el comité de análisis del accidente:{' '}
      </p>
      <p>{accidentData.need_comite ? 'Si' : 'No'}</p>
    </div>
  </>
)
export default PrevAccidentData
