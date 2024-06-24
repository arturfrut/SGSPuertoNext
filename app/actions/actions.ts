'use server'

import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'

export const createProduct = async (formData: FormData) => {
  const rawData = {
    name: formData.get('name') as string,
    price: formData.get('price') as string,
    available: formData.get('available') as string
  }
  await sql`insert into products (name, price, availabe) values (${rawData.name}, ${rawData.price}, ${rawData.available})`
  
  // Revalidate para que pida q se vuelva a buscar la data
  revalidatePath("/")
}
