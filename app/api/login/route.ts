import { db } from '@vercel/postgres'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SECRET_KEY = 'puertoSGS2024'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  try {
    const client = await db.connect()

    const { rows: users } = await client.sql`
      SELECT * FROM users WHERE username = ${username};
    `
    if (users.length === 0) {
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 }
      )
    }

    const user = users[0]

    // IMPORTANTE! ACTUALMENTE LAS PASS NO SE ESTAN GUARDANDO HASHEADAS

    // const passwordMatch = await bcrypt.compare(password, user.password);

    // if (!passwordMatch) {
    //   return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    // }

    if (password !== user.password) {
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 }
      )
    }

    // IMPORTANTE! ACTUALMENTE EL TOKEN DURA 12 HORAS


    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: '12h'
    })

    return NextResponse.json({ token })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
