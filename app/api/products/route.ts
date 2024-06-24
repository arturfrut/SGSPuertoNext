// import { sql } from '@vercel/postgres'
import { db } from '@vercel/postgres'
import { NextResponse } from 'next/server'


// Trae respuesta completa, con mucha data de la petición 
// export async function GET(request: Request) {
//   const response = await sql`select * from products;`
//   return NextResponse.json({ response })
// }

// Trae solo la data que voy a usar, que viene en las rows
// export async function GET(request: Request) {
//   const { rows: products } = await sql`select * from products;`
//   return NextResponse.json({ products })
// }

export async function GET(request: Request) {
  const client = await db.connect()

  const { rows: products } = await client.sql`select * from products;`
  return NextResponse.json( products )
}
