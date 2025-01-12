import { checkDateForChip } from "@/utils/daysUntilExpiration"
import { Card, CardBody, Chip } from "@nextui-org/react"

export const PrevSign = ({ fullTripulant }) => {
  const prevData = fullTripulant?.politicsSigned?.[0] || null

  return (
    <Card className='w-full md:mx-8 p-4'>
      <CardBody className='my-4'>
        <Chip
          color={
            prevData
              ? checkDateForChip(prevData.expiration_date).color
              : 'default'
          }
        >
          {prevData
            ? checkDateForChip(prevData.expiration_date).text
            : 'Documento sin cargar'}
        </Chip>
        {prevData ? (
          <div className="mt-4">
            <p>Datos de la última carga:</p>
            <p>
              Fecha de carga:{' '}
              {new Date(prevData.charged_date).toLocaleDateString()}
            </p>
            <p>
              Próximo vencimiento:{' '}
              {new Date(prevData.expiration_date).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>Es la primera vez que se carga este documento</p>
        )}
      </CardBody>
    </Card>
  )
}