import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip
} from '@nextui-org/react'
import EvidenceModal from './evidenceModal'
import axios from 'axios'
import { useState, useEffect } from 'react'

export const ExpirationTable = ({ idOmi, idCaptain }) => {
  const [expirationsData, setExpirationsData] = useState([])

  useEffect(() => {
    const fetchExpirationData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/get_expirations/${idOmi}`
        )
        const data = response.data
        setExpirationsData(data)
        console.log('GET',data)
      } catch (error) {
        console.error('Error fetching history data:', error)
      }
    }

    if (idOmi) {
      fetchExpirationData()
    }
  }, [idOmi])

  return (
    <Table aria-label='Table for port guard points' className='w-full'>
      <TableHeader>
        <TableColumn>Documento</TableColumn>
        <TableColumn>Próximo vencimiento</TableColumn>

        <TableColumn>Ver / Cargar / Actualizar Datos</TableColumn>
      </TableHeader>
      <TableBody emptyContent='Cargando data'>
        {expirationsData.map((theme, index) => (
          <TableRow key={index}>
            <TableCell>{theme?.title}</TableCell>
            <TableCell>
              <Chip>No se ha subido este documento</Chip>
            </TableCell>

            <TableCell>
              <EvidenceModal
                expirationTitle={theme?.title}
                expirationId={theme?.id}
                id_OMI={idOmi}
                captainId={idCaptain}
                lastChargeData={{ data: '' }}
                haveExpiration={theme?.have_expiration}
                haveLapse={theme?.have_lapse}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
