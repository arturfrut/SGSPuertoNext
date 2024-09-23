import supabase from '@/lib/supabase'
import { apiUploadImage } from '@/utils/apiUploadImage'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    // Obtener los campos del formData
    const nextExpiration = formData.get('nextExpiration') as string
    const finalExpiration = formData.get('finalExpiration') as string
    const lapseExpiration = formData.get('lapseExpiration') as string
    const id_OMI = formData.get('id_OMI') as string
    const captainId = formData.get('capatain_id') as string
    const expirationId = formData.get('expiration_id') as string

    // Asegúrate de que los campos requeridos estén presentes
    if (
      !nextExpiration ||
      !finalExpiration ||
      !lapseExpiration ||
      !id_OMI ||
      !captainId ||
      !expirationId
    ) {
      return NextResponse.json(
        { error: 'Missing or invalid required fields' },
        { status: 400 }
      )
    }

    // Manejar múltiples imágenes
    const uploadedImages: string[] = await Promise.all(
      Array.from(formData.entries()).map(async ([key, value]) => {
        if (key.startsWith('image_') && value instanceof File) {
          const uploadImageData = {
            fileName: `expirations/${id_OMI}_${expirationId}_${key}_${uuidv4()}`,
            bucketName: 'sailors_documents_storage',
            file: value as File
          }
          const publicUrl = await apiUploadImage(uploadImageData)
          return publicUrl // Retorna la URL de la imagen
        }
        return null // Si no es una imagen, retorna null
      })
    ).then(results => results.filter(url => url !== null)) // Filtra los valores nulos

    // Insertar la información en la tabla `expirations`
    const { error: insertError } = await supabase.from('expirations').insert([
      {
        next_expiration: nextExpiration,
        final_expiration: finalExpiration,
        lapse_expiration: lapseExpiration,
        id_omi: id_OMI,
        captain_id: captainId,
        id_title: expirationId,
        images_urls: uploadedImages
      }
    ])

    if (insertError) {
      console.error('Insert error:', insertError)
      throw insertError
    }

    return NextResponse.json({
      message: 'Expirations data and images uploaded successfully',
      images: uploadedImages
    })
  } catch (error: any) {
    console.error('Error processing request:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
