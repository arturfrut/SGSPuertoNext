'use client'
import { Button } from '@nextui-org/react'
import { useState } from 'react'
import { TableWrapper } from '../table/table'

// const Chart = dynamic(() => import('../charts/steam').then(mod => mod.Steam), {
//   ssr: false
// })
// Revisar si es necesario usar dynamic

export const Content = () => {
  const [showTables, setShowTables] = useState({
    expirationControls: false,
    sailors: false,
    others: false
  })

  return (
    <div className='h-full lg:px-6'>
      <div className='flex flex-col justify-center w-full py-5 px-4 lg:px-0  max-w-[90rem] mx-auto gap-3'>
        <h1 className='text-center text-4xl font-bold'>
          Buenas tardes *NOMBRE DE USUARIO*{' '}
        </h1>
        <div>
          La idea es que se muestren solamente los vencimientos y futuros
          vencimientos además de avisos importantes que podrá enviar el
          administrador o la empresa,
          Agregar fecha de vencimiento, en color los días que faltan, quien fue el responsable

        </div>
        <h1 className='text-center text-4xl font-bold'>
          Selector de barco bonito y grande que habilita barra lateral
        </h1>
        <div className='flex  flex-wrap justify-between'>
          <h3 className='text-center text-xl font-semibold'>
            Control de vencimientos
          </h3>
          <Button
            onClick={() =>
              setShowTables({
                ...showTables,
                expirationControls: !showTables.expirationControls
              })
            }
          >
            Mostrar tabla
          </Button>
        </div>
        {showTables.expirationControls && <TableWrapper />}
        <div className='flex  flex-wrap justify-between'>
          <h3 className='text-center text-xl font-semibold'>Marineros</h3>
          <Button
            onClick={() =>
              setShowTables({
                ...showTables,
                expirationControls: !showTables.sailors
              })
            }
          >
            Mostrar tabla
          </Button>
        </div>
        {showTables.sailors && <TableWrapper />}
        <div className='flex  flex-wrap justify-between'>
          <h3 className='text-center text-xl font-semibold'>
            Otros vencimientos, formularios
          </h3>
          <Button
            onClick={() =>
              setShowTables({
                ...showTables,
                expirationControls: !showTables.others
              })
            }
          >
            Mostrar tabla
          </Button>
        </div>
        {showTables.others && <TableWrapper />}
      </div>
    </div>
  )
}
