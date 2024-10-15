import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

interface Params {
  params: {
    id_OMI: string
  }
}

// Función auxiliar para clasificar documentos por tipo
function organizeDocumentsByType(documents: any[]) {
  const organizedDocs: any = {}

  documents.forEach(doc => {
    if (!organizedDocs[doc.doc_type]) {
      organizedDocs[doc.doc_type] = []
    }
    organizedDocs[doc.doc_type].push(doc)
  })

  // Ordenar documentos dentro de cada tipo por `charged_date`
  for (const type in organizedDocs) {
    organizedDocs[type].sort((a, b) => {
      const dateA = new Date(a.charged_date).getTime()
      const dateB = new Date(b.charged_date).getTime()
      return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA)
    })
  }

  return organizedDocs
}

export async function GET(request: Request, { params }: Params) {
  try {
    const id_OMI = params.id_OMI

    if (!id_OMI) {
      return NextResponse.json({ error: 'id_OMI is required' }, { status: 400 })
    }

    // Paso 3: Obtener todos los marineros que coinciden con el barco (id_OMI)
    const { data: sailorsData, error: sailorsError } = await supabase
      .from('sailors')
      .select('name, cel_number, sailor_book_number, charge')
      .eq('actual_ship', id_OMI)

    if (sailorsError) {
      throw sailorsError
    }

    if (!sailorsData || sailorsData.length === 0) {
      return NextResponse.json(
        { error: 'No se encontraron marineros para el barco dado' },
        { status: 404 }
      )
    }

    // Paso 5: Construir el array de tripulación con los documentos asociados
    const tripulationWithDocuments = await Promise.all(
      sailorsData.map(async sailor => {
        // Obtener los documentos del marinero
        const { data: documentsData, error: documentsError } = await supabase
          .from('sailors_documents')
          .select(
            'doc_type, charged_date, expiration_date, sailor_book_number, img_url, charged_by'
          )
          .eq('sailor_book_number', sailor.sailor_book_number)

        if (documentsError) {
          throw documentsError
        }

        const organizedDocuments = organizeDocumentsByType(documentsData)

        // Armar el objeto de marinero con los documentos
        return {
          sailor_book_number: sailor.sailor_book_number,
          name: sailor.name,
          rol: sailor.charge,
          sailorBookData: {
            sailor_book_first: organizedDocuments.sailor_book_first || [],
            renovation: organizedDocuments.renovation || [],
            medical_certification:
              organizedDocuments.medical_certification || [],
            cense: organizedDocuments.cense || [],
            stcw: organizedDocuments.stcw || []
          },
          provisory_card: {
            provisory_sailor_book_first:
              organizedDocuments.sailor_book_first || [],
            provisory_renovation: organizedDocuments.renovation || [],
            provisory_medical_certification:
              organizedDocuments.medical_certification || [],
            provisory_cense: organizedDocuments.cense || [],
            provisory_stcw: organizedDocuments.stcw || []
          },
          politicsSigned: organizedDocuments.politicsSigned || [],
          familiarizationSigned: organizedDocuments.familiarizationSigned || [],
          protectionExpiration: organizedDocuments.protectionExpiration || [],
          expiration_controls: organizedDocuments.expiration_controls || []
        }
      })
    )

    return NextResponse.json(tripulationWithDocuments)
  } catch (error: any) {
    console.error('Error fetching crew and documents:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
