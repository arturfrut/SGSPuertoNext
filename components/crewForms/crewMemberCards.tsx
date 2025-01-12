import { Accordion, AccordionItem } from '@nextui-org/react'
import { AccordionMember } from './accordionMember'
import useGlobalStore from '@/stores/useGlobalStore'
import { useCrewMembersAccordion } from '@/app/hooks/components/useCrewMembersAccordion'

const CrewMemberCards = () => {
  const { loadingCrew, errorCrew } = useCrewMembersAccordion()
  const { tripulation: tripulationStore } = useGlobalStore()

  console.log('tripu', tripulationStore)

  if (loadingCrew) {
    return <h1>Cargando data...</h1>
  }

  if (errorCrew) {
    return <h1>Error al cargar la data.</h1>
  }

  return tripulationStore?.length > 0 ? (
    <Accordion variant='splitted'>
      {tripulationStore.map((crewMember, index) => (
        <AccordionItem
          key={index}
          aria-label='Accordion 1'
          title={`${crewMember.rol} - ${crewMember.name}`}
        >
          <AccordionMember crewMember={crewMember} />
        </AccordionItem>
      ))}
    </Accordion>
  ) : (
    <h1>No hay datos disponibles.</h1>
  )
}

export default CrewMemberCards