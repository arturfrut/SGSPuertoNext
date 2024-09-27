import supabase from '@/lib/supabase'

interface apiInsertErorInterface {
  fileName: string
  bucketName: string
  insertError: Error | null | undefined
}

export const insertError = async ({
  insertError,
  fileName,
  bucketName
}: apiInsertErorInterface) => {
  if (insertError) {
    console.error('Insert error:', insertError)
    // Eliminar la imagen del bucket si la inserción falla
    const { error: deleteError } = await supabase.storage
      .from(bucketName)
      .remove([fileName])

    if (deleteError) {
      console.error('Delete error:', deleteError)
      throw deleteError
    }

    throw insertError
  }
}
