'use client'
import SignModal from '@/components/signModal'
import useSignModal from '@/components/signModal/useSignModal'
import { SignatureChecker } from '@/components/signatureChecker'
import useGlobalStore from '@/stores/useGlobalStore'
import { generateExpirationDate } from '@/utils/generateExpirationDateUploadImage'
import { Button, Card, CardBody, CardFooter, Divider } from '@nextui-org/react'
import axios from 'axios'
import { useState } from 'react'

export const Fp101 = () => {
  const { signatures, handleSaveSignature } = useSignModal()
  const { selectedTripulant, userId } = useGlobalStore()
  const [waitingResponse, setWaitingResponse] = useState(false)

  const submitData = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!signatures) {
      alert('Debes firmar el documento')
      return
    }

    const formData = new FormData()
    formData.append('doc_type', 'politicsSigned')
    formData.append('charged_by', userId.toString())
    formData.append('expiration_date', generateExpirationDate())
    formData.append(
      'sailor_book_number',
      selectedTripulant.sailor_book_number.toString()
    )
    formData.append('sign', signatures.sailorSign)
    try {
      setWaitingResponse(true)
      const response = await axios.post('/api/upload_image', formData)
      alert('Documento registrado')
      setWaitingResponse(false)
    } catch (error) {
      console.error('Error creating document:', error)
      alert('Error al registrar documento')
      setWaitingResponse(false)
    }
  }

  // const isSpecial =
  //   sailorRol === 'Capitan' ||
  //   sailorRol === 'Jefe de máquinas' ||
  //   sailorRol === 'Guardia'

  return (
    <Card className='w-full md:mx-8 p-4 '>
      <CardBody className='my-4'>
        <p className='text-2xl text-center mb-4 underline'>
          POLÍTICA DE SEGURIDAD, PROTECCIÓN AMBIENTAL, NO DISCRIMINACIÓN Y NO
          VIOLENCIA DE GÉNERO
        </p>
        <p className='text-l'>
          <strong>AIRES MARINOS S.A. </strong>ha establecido un sistema de
          gestión de seguridad que cumple con las prescripciones: de la
          Ordenanza Nº 05/2018 DPSN TOMO 2 “Normas de Gestión de Seguridad
          Operacional de Buque y la Prevención de la Contaminación (NGS); que
          tiene por objeto garantizar la seguridad marítima, evitar lesiones
          personales o pérdidas de vidas humanas, daños al medio ambiente y a
          los bienes.
          <br />
          <p className='ml-4'>
            Leyes N° 23.592 Penalización Actos discriminatorios y N°24.515
            Creación del INADI.
            <br />
            Para el logro y mantenimiento de los objetivos mencionados, la
            Compañía se compromete a:
          </p>
        </p>
        <p className='mb-2 mt-2 ml-4'>
          1. Operar con elevados estándares de seguridad.
        </p>
        <p className='mb-2 ml-4'>
          2. Tomar precauciones contra todos los riesgos posibles.
        </p>
        <p className='mb-2 ml-4'>
          3. Conformar la tripulación con personal idóneo y en buen estado
          físico.
        </p>
        <p className='mb-2 ml-4'>
          4. Brindar el adecuado adiestramiento a todo el personal, a fin de que
          puedan actuar eficientemente ante emergencias, accidentes y
          situaciones de peligro que afecten a la seguridad y al medio ambiente.
        </p>
        <p className='mb-2 ml-4'>
          5. Nos comprometemos a promover la integración social fomentando
          grupos de trabajos estables, seguros y justos, y que estén basados en
          la promoción y protección de todos los derechos humanos, así como en
          la no-discriminación, no violencia de género, la tolerancia, el
          respeto de la diversidad, la igualdad de oportunidad, la solidaridad,
          la seguridad y la participación de todas las personas. Con ese fin, en
          el plano Laboral de la Compañía.
        </p>
        <p>
          El cumplimiento de esta Política, así como también de las reglas,
          Normas y regulaciones aplicables; es responsabilidad de todos los
          integrantes de la Compañía.
        </p>
      </CardBody>

      <Divider />

      <CardBody className='mb-4'>
        <p className='text-2xl text-center my-4 underline'>
          POLÍTICA DE ALCOHOL Y DROGAS
        </p>
        <p>
          <strong>AIRES MARINOS S.A. </strong>considera que el consumo de
          alcohol y el consumo de drogas y otras sustancias similares, deteriora
          el desempeño en el trabajo y es una seria amenaza para la salud, la
          productividad y la seguridad de todo su personal y de la empresa.
          <br />
          Con el fin de evitar los riesgos mencionados, aplicamos la siguiente
          política, cuyo estricto cumplimiento es condición de empleo para todo
          su personal:
          <p>
            - Está terminantemente prohibido el consumo de alcohol, drogas,
            tenencia, distribución o venta de drogas ilegales o sustancias
            similares durante su actividad en el ámbito de trabajo.
          </p>
          <p>
            - Tampoco está permitido distribuir o vender bebidas alcohólicas en
            las instalaciones de la Empresa.
          </p>
          <p>
            - Se podrán efectuar controles periódicos sin previo anuncio, para
            determinar la existencia y consumo de alcohol y/o drogas en los
            buques operados por la Compañía.
          </p>
          <p>
            - Cuando existan causas para sospechar consumo de alcohol y/o
            drogas, se podrá exigir al personal, que se someta a los análisis y
            a las pruebas de dosaje de esas sustancias.
          </p>
          El incumplimiento de esta política dará lugar a sanciones, incluyendo
          la finalización del vínculo laboral.
        </p>
      </CardBody>

      <Divider />

      <CardBody className='mb-4'>
        <p className='text-2xl text-center my-4 underline'>POLÍTICA DE FUMAR</p>
        <p>
          <strong> AIRES MARINOS S.A. </strong> ha estudiado los antecedentes
          que demuestran los daños que la adicción de fumar produce a la salud
          de las personas fumadoras y no fumadoras, como consecuencia de la
          contaminación del aire del medio ambiente, especialmente en espacios
          cerrados produciendo en consecuencia enfermedades, disminución de la
          actitud física y de la vida de la misma.
          <p />
          <p className='mt-1'>
            Además el acto de fumar es un posible foco de incendio, si las
            condiciones ambientales son favorables para que se produzcan, lo que
            constituye un riesgo identificado e inaceptable para la seguridad de
            las personas, la embarcación, los bienes y la prevención de la
            contaminación de medio ambiente. Con el fin de evitar los riesgos
            señalados como presidente de la compañía dispongo:
          </p>
          <p className='mb-2 mt-2 ml-4'>
            . Prohibido fumar a bordo de las embarcaciones a todas las personas
            que embarquen o cualquier otra persona que deba desarrollar, o no,
            alguna tarea a bordo, en los espacios comunes y cerrados. Así mismo
            no se objetara en los espacios al aire libre.
          </p>
          <p className='mb-2 ml-4'>
            . Prohibir fumar en la oficina de la Compañía, donde convivan
            fumadores y no fumadores y en los lugares destinados a archivo o
            depósito de materiales en general. Así mismo no se objetara en los
            espacios al aire libre.
          </p>
        </p>
      </CardBody>
      <Divider />
      <CardBody className=' gap-4 mt-3'>
        <div className='w-full  '>
          <p className='text-2xl  my-4'>
            {'Nombre tripulante: ' + selectedTripulant.name}
          </p>
          <p className='text-2xl my-4'>{'Puesto: ' + selectedTripulant.rol}</p>
        </div>
        <div className='w-full md:w-1/3 flex items-center gap-5'>
          <SignModal
            onSave={(data: any) => handleSaveSignature(data, 'sailorSign')}
            title='FIRMA'
          />
          <SignatureChecker status={signatures?.sailorSign} />
        </div>


        <Divider />
        <p className='text-sm'>
          <strong>REFERENCIA: </strong>Ley 26687 Anti Tabaco y Ordenanzas Nº
          05/2018 TOMO 2 “Normas de Gestión de Seguridad Operacional de Buque y
          la Prevención de la Contaminación (NGS) Cláusula 7 y 02/2011 TOMO 5.
          DPSN. ”Control de Alcoholemia al personal de la Marina Mercante
          Nacional”. Leyes N° 23.592 Penalización Actos discriminatorios y
          N°24.515 Creación del INADI.
        </p>
        <Divider />
      </CardBody>
      <CardFooter className='flex justify-end'>
        <Button
          onClick={submitData}
          isLoading={waitingResponse}
          className=' bg-warning-400 text-black'
        >
          Enviar formulario
        </Button>
      </CardFooter>
    </Card>
  )
}
