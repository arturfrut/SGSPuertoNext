import { Accordion, AccordionItem } from '@nextui-org/react'
import { AccordionMember } from './accordionMember'
import useGlobalStore from '@/stores/useGlobalStore'

const CrewMemberCards = () => {
  const { tripulation } = useGlobalStore()
  return (
    <Accordion variant='splitted'>
      {tripulation.map((crewMember,index) => (
        <AccordionItem key={index} aria-label='Accordion 1' title={crewMember.rol+' - '+crewMember.name}>
          <AccordionMember crewMember={crewMember}/>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default CrewMemberCards
