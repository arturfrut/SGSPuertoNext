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
import { calculateExpirationInfo } from '@/utils/calculateExpirations'
import { useExpirationsByShip } from '@/app/hooks/useExpirationsByShip'
import useGlobalStore from '@/stores/useGlobalStore'

export const ExpirationTable = ({ idOmi }: {idOmi: string | number | undefined}) => {
  const {expirationsData} = useExpirationsByShip(idOmi)
  const {idCaptain} = useGlobalStore()
  return (
    <Table aria-label='Table for port guard points' className='w-full'>
      <TableHeader>
        <TableColumn>Documento</TableColumn>
        <TableColumn>Próximo vencimiento</TableColumn>

        <TableColumn>Ver / Cargar / Actualizar Datos</TableColumn>
      </TableHeader>
      <TableBody emptyContent='Cargando data'>
        {expirationsData?.map((theme, index) => (
          <TableRow key={index}>
            <TableCell>{theme?.title}</TableCell>
            <TableCell>
              <Chip
                color={
                  theme.lastChargeData
                    ? calculateExpirationInfo(theme.lastChargeData)
                        .nearExpiration.color
                    : 'default'
                }
              >
                {' '}
                {theme.lastChargeData
                  ? calculateExpirationInfo(theme.lastChargeData).nearExpiration
                      .message
                  : 'Documento sin cargar'}
              </Chip>
            </TableCell>

            <TableCell>
              <EvidenceModal
                expirationTitle={theme?.title}
                expirationId={String(theme?.id)}
                id_OMI={String(idOmi)}
                captainId={String(idCaptain)}
                lastChargeData={theme?.lastChargeData}
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
