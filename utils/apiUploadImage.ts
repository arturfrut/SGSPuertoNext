import supabase from '@/lib/supabase'

interface apiUploadImageInterface {
  fileName: string
  bucketName: string
  file: File
}

export const apiUploadImage = async ({
  fileName,
  bucketName,
  file
}: apiUploadImageInterface) => {
  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(fileName, file)

  if (uploadError) {
    console.error('Upload error:', uploadError)
    throw uploadError
  }

  const {
    data: { publicUrl },
    // @ts-ignore

    error: urlError
  } = supabase.storage.from('sailors_documents_storage').getPublicUrl(fileName)

  if (urlError) {
    console.error('URL error:', urlError)
    throw urlError
  }

  return publicUrl
}
