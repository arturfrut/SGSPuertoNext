import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  let fileName: string | null = null;

  try {
    const formData = await request.formData()
    // console.log('Form data:', formData)

    const docType = formData.get('doc_type') as string
    const captainId = parseInt(formData.get('captain_id') as string, 10)
    const expirationDate = formData.get('expiration_date') as string
    const sailorBookNumber = formData.get('sailor_book_number') as string
    const file = formData.get('file') as File

    // console.log({docType, captainId, expirationDate, sailorBookNumber, file})

    if (
      !file ||
      !docType ||
      isNaN(captainId) ||
      !expirationDate
    ) {
      return NextResponse.json(
        { error: 'Missing or invalid required fields' },
        { status: 400 }
      )
    }

    // 1. Subir la imagen al bucket
    fileName = `${sailorBookNumber}_${uuidv4()}_${docType}_${expirationDate}`
    const { error: uploadError } = await supabase.storage
      .from('sailors_documents_storage')
      .upload(fileName, file)

    if (uploadError) {
      console.error('Upload error:', uploadError)
      throw uploadError
    }

    // 2. Obtener la URL pública de la imagen
    const {
      data: { publicUrl },
      error: urlError
    } = supabase.storage.from('sailors_documents_storage').getPublicUrl(fileName)

    if (urlError) {
      console.error('URL error:', urlError)
      throw urlError
    }

    // 3. Insertar la información en la tabla
    const { error: insertError } = await supabase
      .from('sailors_documents')
      .insert([
        {
          doc_type: docType,
          captain_id: captainId,
          charge_date: new Date().toISOString(), // Fecha actual
          expiration_date: expirationDate,
          sailor_book_number: sailorBookNumber,
          img_url: publicUrl
        }
      ])

    if (insertError) {
      console.error('Insert error:', insertError)
      // Eliminar la imagen del bucket si la inserción falla
      const { error: deleteError } = await supabase.storage
        .from('sailors_documents_storage')
        .remove([fileName])
      
      if (deleteError) {
        console.error('Delete error:', deleteError)
        throw deleteError
      }

      throw insertError
    }

    return NextResponse.json({
      message: 'Image uploaded and data saved successfully'
    })
  } catch (error: any) {
    console.error('Error uploading image:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
