import { Accordion, AccordionItem } from '@nextui-org/react'
import { AccordionMember } from './accordionMember'
import useGlobalStore from '@/stores/useGlobalStore'
import { useCrewMembersAccordion } from '@/app/hooks/components/useCrewMembersAccordion'

const CrewMemberCards = () => {
  useCrewMembersAccordion()
  const { tripulation } = useGlobalStore()
  // const tripulation = mockTrip
  console.log('tripu',tripulation)
  return tripulation?.length > 0 ? (
    <Accordion variant='splitted'>
      {tripulation.map((crewMember, index) => (
        <AccordionItem
          key={index}
          aria-label='Accordion 1'
          title={crewMember.rol + ' - ' + crewMember.name}
        >
          <AccordionMember crewMember={crewMember}/>
          
        </AccordionItem>
      ))}
    </Accordion>
  ) : (
    <h1>Cargando data</h1>
  )
}

export default CrewMemberCards
