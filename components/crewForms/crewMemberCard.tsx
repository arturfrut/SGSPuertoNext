import { Accordion, AccordionItem,  } from '@nextui-org/react'
import { AccordionMember } from './accordionMember'

export default function CrewMemberCard() {
  

  return (
    <Accordion variant='splitted'>
      <AccordionItem key='1' aria-label='Accordion 1' title='Marinero 1 66%'>
        <AccordionMember />
      </AccordionItem>
    </Accordion>
  )
}
