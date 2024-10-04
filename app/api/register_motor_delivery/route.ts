import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Parsear los datos recibidos en el cuerpo de la solicitud
    const deliveryData = await request.json()

    // Destructuring de los campos del objeto delivery
    const {
      newComments,
      shipState,
      receiptPersonName,
      deliveryPersonName,
      deliveryPersonCharge,
      receiptPersonCharge,
      receiptSign,
      deliverySign,
      shipOmi, // Nuevos campos numéricos
      chargedBy // Nuevos campos numéricos
    } = deliveryData

    // Insertar los datos en la tabla `command_delivery_registers`
    const { error: insertError } = await supabase.from('motor_delivery_registers').insert([
      {
        new_comments: newComments,
        ship_state: shipState,
        receipt_person_name: receiptPersonName,
        delivery_person_name: deliveryPersonName,
        delivery_person_charge: deliveryPersonCharge,
        receipt_person_charge: receiptPersonCharge,
        receipt_sign: receiptSign,
        delivery_sign: deliverySign,
        ship_omi: shipOmi, // Nuevos campos
        charged_by: chargedBy, // Nuevos campos
      }
    ])

    // Manejar errores en caso de que haya problemas con la inserción
    if (insertError) {
      throw insertError
    }

    return NextResponse.json({ message: 'Delivery registrado exitosamente' })
  } catch (error: any) {
    console.error('Error al registrar el delivery:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}