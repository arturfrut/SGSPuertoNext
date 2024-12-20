'use client'
import { useNcn } from '@/app/hooks/components/useNcn'
import SignModal from '@/components/signModal'
import { SignatureChecker } from '@/components/signatureChecker'
import {
  noteClasification,
  shipOrCompany,
  yesNoSelect
} from '@/constants/strings'
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardHeader,
  DatePicker,
  Divider,
  Image,
  Input,
  Radio,
  RadioGroup,
  Textarea
} from '@nextui-org/react'


export const NewNote = () => {

  const {
    ncnActive,
    blockers,
    noteData,
    handleCreation,
    handleSaveSignature,
    signatures,
    waitingResponse,
    handleReception,
    submitReception,
    createNote,
    submitAction,
    handleAction,
    handleNotification,
    submitNotification,
    userData,
    submitClose
  } = useNcn()

  return (
    <Card className='w-full md:px-10 md:py-5'>
      <CardHeader className='flex gap-3'>
        <Image
          alt='nextui logo'
          height={40}
          radius='sm'
          src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
          width={40}
        />
        <div className='flex flex-col'>
          <p className='text-xl'>FN-802 NOTA DE NO CONFORMIDAD</p>
        </div>
      </CardHeader>
      <Divider />
      <Accordion
        title='Notas de no conformidad'
        defaultExpandedKeys={[ncnActive?.status ?? 'created']}
      >
        <AccordionItem
          title='Creación de la nota'
          key='created'
          aria-label='Accordion 1'
        >
          <div
            className={`${
              blockers[0] &&
              'relative z-50 bg-yellow-950 p-4 pointer-events-none'
            } `}
          >
            <p>Título de la nota:</p>
            <Input
              aria-labelledby='title'
              className=' my-4 w-full'
              type='string'
              label='Uso para tarjeta identificatoria'
              value={noteData.creation.title}
              onChange={e => handleCreation('title', e.target.value)}
            />
            <p className='my-4'>Nombre:</p>
            <div className='md:flex md:align-items md:gap-4 '>
              <div className='md:w-1/2'>
                <Input
                  aria-labelledby='company'
                  className='w-full'
                  type='string'
                  label='Nombre de Empresa/Buque'
                  value={noteData.creation.shipOrCompanyName}
                  onChange={e =>
                    handleCreation('shipOrCompanyName', e.target.value)
                  }
                />
              </div>
              <RadioGroup
                name='shipStatus'
                aria-labelledby='shipStatus'
                onChange={e => {
                  handleCreation('shipOrCompany', e.target.value)
                }}
                value={noteData.creation.shipOrCompany}
                className='md:w-1/2'
              >
                {shipOrCompany.map(option => (
                  <Radio key={option} value={option}>
                    {option}
                  </Radio>
                ))}
              </RadioGroup>
            </div>

            <div className='w-full md:flex md:gap-4'>
              <div className='md:w-1/2'>
                <p className='my-2'>Emisor:</p>
                <Input
                  aria-labelledby='emisor'
                  className='w-full'
                  type='string'
                  label='Identidad del Emisor'
                  value={noteData.creation.emisor}
                  onChange={e => {
                    handleCreation('emisor', e.target.value)
                  }}
                />
              </div>
              <div className='md:w-1/2 '>
                <p className='my-2'>Fecha</p>
                <div className='bg-[#27272a] h-14 rounded-xl flex items-center'>
                  <DatePicker
                    granularity='day'
                    aria-labelledby='creationDate'
                    className=''
                    value={noteData.creation.creationDate}
                    onChange={e => handleCreation('creationDate', e)}
                  />
                </div>
              </div>
            </div>
            <p className='my-4'>Evidencia:</p>
            <Textarea
              aria-labelledby='evidence'
              value={noteData.creation.evidence}
              onChange={e => handleCreation('evidence', e.target.value)}
              labelPlacement='outside'
              placeholder='Describa el porque de su nota de no conformidad'
            />
            <div className='w-full md:w-1/2 flex items-center gap-5 my-4'>
              <SignModal
                onSave={(data: any) => handleSaveSignature(data, 'creatorSign')}
                title='FIRMA DEL EMISOR'
              />
              <SignatureChecker status={signatures?.creatorSign} />{' '}
            </div>
            <Button
              isLoading={waitingResponse}
              className='md:w-1/2 mb-4'
              color='warning'
              onClick={createNote}
            >
              Enviar{' '}
            </Button>
          </div>
        </AccordionItem>
        <AccordionItem
          title='Recepción'
          key='received'
          aria-label='Accordion 2'
        >
          <div
            className={`${
              blockers[1] &&
              'relative z-50 bg-yellow-950 p-4 pointer-events-none'
            } `}
          >
            {' '}
            <p className='my-4'>Clasificación:</p>
            <RadioGroup
              aria-labelledby='shipStatus'
              name='shipStatus'
              onChange={e => handleReception('clasification', e.target.value)}
              value={noteData.reception.clasification}
              className='md:w-1/2'
            >
              {noteClasification.map(option => (
                <Radio key={`shipOrCompany-${option}`} value={option}>
                  {option}
                </Radio>
              ))}
            </RadioGroup>
            <div className='w-full md:flex md:gap-4 mb-4'>
              <div className='md:w-1/2'>
                <p className='my-4'>Fecha de entrega PD</p>
                <div className='bg-[#27272a] h-14 rounded-xl flex items-center'>
                  <DatePicker
                    granularity='day'
                    aria-labelledby='inpdddate'
                    className=''
                    value={noteData.reception.inPdDate}
                    onChange={e => handleReception('inPdDate', e)}
                  />
                </div>
              </div>
              <div className='md:w-1/2'>
                <p className='my-4'>Fecha de salida PD</p>
                <div className='bg-[#27272a] h-14 rounded-xl flex items-center'>
                  <DatePicker
                    granularity='day'
                    aria-labelledby='outpdddate'
                    className=''
                    value={noteData.reception.outPdDate}
                    onChange={e => handleReception('outPdDate', e)}
                  />
                </div>
              </div>
            </div>
            <div className='w-full md:w-1/2 flex items-center gap-5 my-4'>
              <SignModal
                onSave={(data: any) =>
                  handleSaveSignature(data, 'receptorSign')
                }
                title='FIRMA DEL RECEPTOR'
              />
              <SignatureChecker status={signatures?.receptorSign} />
            </div>
            <Button
              isLoading={waitingResponse}
              className='md:w-1/2 mb-4'
              color='warning'
              onClick={submitReception}
            >
              Enviar{' '}
            </Button>
          </div>
        </AccordionItem>
        <AccordionItem title='Acción' key='inAction' aria-label='Accordion 3'>
          <div
            className={`${
              blockers[2] &&
              'relative z-50 bg-yellow-950 p-4 pointer-events-none'
            } `}
          >
            {' '}
            <p className='my-4'>Responsable de la acción correctiva:</p>
            <Input
              aria-labelledby='responsable'
              className='w-full'
              type='string'
              label='Nombre y apellido del responsable'
              value={noteData.action.responsableName}
              onChange={e => handleAction('responsableName', e.target.value)}
            />
            <p className='my-4'>Sector afectado</p>
            <Input
              aria-labelledby='sectorName'
              className='w-full'
              type='string'
              label='Nombre del sector'
              value={noteData.action.sectorAfected}
              onChange={e => handleAction('sectorAfected', e.target.value)}
            />
            <p className='my-4'>Acción correctiva:</p>
            <Textarea
              aria-labelledby=''
              value={noteData.action.correctiveAction}
              onChange={e => handleAction('correctiveAction', e.target.value)}
              labelPlacement='outside'
              placeholder='Describa la acción'
            />
            <div className='md:w-1/2'>
              <p className='my-4'>Fecha implementación prevista</p>
              <div className='bg-[#27272a] h-14 rounded-xl flex items-center'>
                <DatePicker
                  granularity='day'
                  aria-labelledby='implementationDate'
                  className=''
                  value={noteData.action.implementationDate}
                  onChange={e => handleAction('implementationDate', e)}
                />
              </div>
            </div>
            <Button
              className='my-4 w-1/2'
              color='warning'
              onClick={submitAction}
              isLoading={waitingResponse}
            >
              Enviar
            </Button>
          </div>
        </AccordionItem>
        <AccordionItem
          title='Notificación'
          key='notified'
          aria-label='Notificación'
        >
          <div
            className={`${
              blockers[3] &&
              'relative z-50 bg-yellow-950 p-4 pointer-events-none'
            } `}
          >
            {' '}
            <p className='my-4'>Cumplimiento</p>
            <div className='md:flex md:items-center md:flex-row-reverse md:gap-4'>
              <div className='md:w-1/2'>
                <RadioGroup
                  name='shipStatus'
                  onChange={e =>
                    handleNotification('cumpliment', e.target.value)
                  }
                  className='md:w-1/2'
                  value={noteData.notification.cumpliment}
                >
                  {yesNoSelect.map(option => (
                    <Radio key={option} value={option}>
                      {option}
                    </Radio>
                  ))}
                </RadioGroup>
              </div>
              <div className='md:w-1/2'>
                <div className='bg-[#27272a] h-14 rounded-xl flex items-center'>
                  <DatePicker granularity='day' />
                </div>
              </div>
            </div>
            <p className='my-4'>Acción correctiva eficaz?</p>
            <RadioGroup
              name='shipStatus'
              onChange={e => handleNotification('actionworks', e.target.value)}
              className='md:w-1/2'
              value={noteData.notification.actionworks}
            >
              {yesNoSelect.map(option => (
                <Radio key={`shipOrCompany-${option}`} value={option}>
                  {option}
                </Radio>
              ))}
            </RadioGroup>
            <p className='my-4'>Observaciones:</p>
            <Textarea
              value={noteData.notification.observation}
              onChange={e => handleNotification('observation', e.target.value)}
              labelPlacement='outside'
              placeholder='Describa la acción'
            />
            <div className='md:flex md:gap-5 mt-4'>
              <div className='w-full md:w-1/2 flex items-center gap-5'>
                <SignModal
                  onSave={(data: any) => handleSaveSignature(data, 'AcSign')}
                  title='FIRMA RESPONSABLE DE LA A.C'
                />
                <SignatureChecker status={signatures?.AcSign} />
              </div>
              <div className='w-full md:w-1/2 flex items-center gap-5'>
                <SignModal
                  onSave={(data: any) => handleSaveSignature(data, 'SgsSign')}
                  title='FIRMA RESPONSABLE SGS'
                />
                <SignatureChecker status={signatures?.SgsSign} />
              </div>
            </div>
            <Button
              isLoading={waitingResponse}
              className='md:w-1/2 my-4'
              color='warning'
              onClick={submitNotification}
            >
              Enviar{' '}
            </Button>
          </div>
        </AccordionItem>
        <AccordionItem title='Cerrar nota' key='5' aria-label='Cerrar nota'>
          <div
            className={`${
              userData.roles.includes[1] &&
              'relative z-50 bg-yellow-950 p-4 pointer-events-none'
            } `}
          >
            {' '}
            <div className='flex justify-center'>
              <Button
                color='warning'
                onClick={submitClose}
                isLoading={waitingResponse}
              >
                Cerrar Nota de no Conformidad
              </Button>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}
