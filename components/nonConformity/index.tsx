'use client'
import { Card, CardHeader, Divider, CardBody, Image } from '@nextui-org/react'
import { NonConformityCard } from './nonConformityCard'
import { NonConformityTable } from './nonConformityTable'

export const NonCoformity = () => {

  return (
    <Card className='w-full  md:px-10 md:py-5'>
      <CardHeader className='flex gap-3'>
        <Image
          alt='nextui logo'
          height={40}
          radius='sm'
          src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
          width={40}
        />
        <div className='flex flex-col'>
          <p className='text-xl'>Ordenes y reparaciones</p>
        </div>
      </CardHeader>
      <Divider className='mb-4' />
      <CardBody>
        <NonConformityCard />
        <NonConformityTable idOmi={123} />
      </CardBody>
    </Card>
  )
}
