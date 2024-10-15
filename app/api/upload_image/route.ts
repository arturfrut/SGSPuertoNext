import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  let fileName: string | null = null

  try {
    const formData = await request.formData()
    // console.log('Form data:', formData)

    const docType = formData.get('doc_type') as string
    const chargedBy = parseInt(formData.get('charged_by') as string, 10) // cambiado de captain Id
    const expirationDate = formData.get('expiration_date') as string
    const sailorBookNumber = formData.get('sailor_book_number') as string
    const file = formData.get('file') as File
    const sign = formData.get('sign') as string
    const special_sign = formData.get('special_sign') as string
    const special_sign_name = formData.get('special_sign_name') as string

    console.log({ docType, chargedBy, expirationDate })

    if (!docType || isNaN(chargedBy) || !expirationDate) {
      return NextResponse.json(
        { error: 'Missing or invalid required fields' },
        { status: 400 }
      )
    }

    // 1. Subir la imagen al bucket
    if (file) {
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
        // @ts-ignore
        error: urlError
      } = supabase.storage
        .from('sailors_documents_storage')
        .getPublicUrl(fileName)

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
            charged_by: chargedBy,
            charged_date: new Date().toISOString(), // Fecha actual
            expiration_date: expirationDate,
            sailor_book_number: sailorBookNumber,
            img_url: publicUrl,
            sign
          }
        ])

      if (insertError) {
        console.error('Insert error:', insertError)
        // Eliminar la imagen del bucket si la inserción falla
        const { error: deleteError } = await supabase.storage
          .from('sailors_documents_storage')
          .remove([`expirations/${fileName}`])

        if (deleteError) {
          console.error('Delete error:', deleteError)
          throw deleteError
        }

        throw insertError
      }
    } else {
      const { error: insertError } = await supabase
        .from('sailors_documents')
        .insert([
          {
            doc_type: docType,
            charged_by: chargedBy,
            charged_date: new Date().toISOString(), // Fecha actual
            expiration_date: expirationDate,
            sailor_book_number: sailorBookNumber,
            img_url: null,
            sign,
            special_sign,
            special_sign_name
          }
        ])
      if (insertError) {
        console.error('Insert error:', insertError)
        throw insertError
      }
    }

    return NextResponse.json({
      message: 'Image uploaded and data saved successfully'
    })
  } catch (error: any) {
    console.error('Error uploading image:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
