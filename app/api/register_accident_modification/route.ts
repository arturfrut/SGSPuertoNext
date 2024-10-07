import supabase from '@/lib/supabase'
import { apiUploadImage } from '@/utils/apiUploadImage'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const charged_by = formData.get('charged_by') as string
    const newcomment = formData.get('newcomment') as string
    const imageFile = formData.get('imageFile') as File | null
    const newsign = formData.get('newSign') as string
    const id_accident = formData.get('id_accident') as string

    // Asegúrate de que los campos requeridos estén presentes
    if (!charged_by || !newcomment || !id_accident) {
      return NextResponse.json(
        { error: 'Missing or invalid required fields' },
        { status: 400 }
      )
    }

    let uploadedImageUrl: string | null = null

    // Verificar si hay una imagen presente y subirla
    if (imageFile) {
      const uploadImageData = {
        fileName: `accidents/${id_accident}_${uuidv4()}`,
        bucketName: 'sailors_documents_storage',
        file: imageFile
      }
      uploadedImageUrl = await apiUploadImage(uploadImageData)
    }

    const { error: insertError } = await supabase.from('accident_registers').insert([
      {
        charged_by: charged_by,
        newcomment: newcomment,
        imageadded: uploadedImageUrl, 
        newsign: newsign,
        id_accident
      }
    ])

    if (insertError) {
      console.error('Insert error:', insertError)
      throw insertError
    }

    return NextResponse.json({
      message: 'Accident data and image uploaded successfully',
      image: uploadedImageUrl
    })
  } catch (error: any) {
    console.error('Error processing request:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}