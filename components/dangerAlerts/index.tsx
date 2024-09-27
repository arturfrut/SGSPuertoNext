'use client'

import { Accordion, AccordionItem, Divider, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"

export const DangerAlerts = () => {
  return (
    <div className=' w-full '>

      <Divider className='my-4' />
      <Accordion>
      <AccordionItem key='1' aria-label='Accordion 1' title='Reportes de accidentes'>
          <Table aria-label='Example static collection table'>
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>ROLE</TableColumn>
              <TableColumn>STATUS</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key='1'>
                <TableCell>Tony Reichert</TableCell>
                <TableCell>CEO</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key='2'>
                <TableCell>Zoey Lang</TableCell>
                <TableCell>Technical Lead</TableCell>
                <TableCell>Paused</TableCell>
              </TableRow>
              <TableRow key='3'>
                <TableCell>Jane Fisher</TableCell>
                <TableCell>Senior Developer</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key='4'>
                <TableCell>William Howard</TableCell>
                <TableCell>Community Manager</TableCell>
                <TableCell>Vacation</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </AccordionItem>
        <AccordionItem key='2' aria-label='Accordion 2' title='Alertas meteorológicas'>
          <Table aria-label='Example static collection table'>
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>ROLE</TableColumn>
              <TableColumn>STATUS</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key='1'>
                <TableCell>Tony Reichert</TableCell>
                <TableCell>CEO</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key='2'>
                <TableCell>Zoey Lang</TableCell>
                <TableCell>Technical Lead</TableCell>
                <TableCell>Paused</TableCell>
              </TableRow>
              <TableRow key='3'>
                <TableCell>Jane Fisher</TableCell>
                <TableCell>Senior Developer</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key='4'>
                <TableCell>William Howard</TableCell>
                <TableCell>Community Manager</TableCell>
                <TableCell>Vacation</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </AccordionItem>
      </Accordion>
    </div>
  )


  
}
