import { Accordion, AccordionItem, Divider } from '@nextui-org/react'

export default function CrewMemberCard() {
  const defaultContent =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

  return (
    <Accordion variant='splitted'>
      <AccordionItem key='1' aria-label='Accordion 1' title='Marinero 1 66%'>
        Formulario 500
        <Divider />
        <p>
          Titulo arriba más oscuro y grande, icono de estado a la izquierda,
          status
        </p>
        <p>Carga de libreta </p>
        <p>En caso de estar completo se mostrará en verde lo de 3/3</p>
        <Divider />
      </AccordionItem>
      <AccordionItem key='2' aria-label='Accordion 2' title='Marinero 2 1/3'>
        {defaultContent}
      </AccordionItem>
      <AccordionItem key='3' aria-label='Accordion 3' title='Marinero 3 3/3'>
        {defaultContent}
      </AccordionItem>
    </Accordion>
  )
}
