import supabase from '@/lib/supabase'

export const getSupabaseSession = async () => {
  try {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      throw sessionError;
    }

    if (!session || !session.access_token) {
      throw new Error("El usuario no está autenticado o el token no está disponible");
    }

    // Configurar los headers de la solicitud
    const config = {
      headers: {
        Authorization: `Bearer ${session.access_token}`, // Incluir el token de autenticación
        "Content-Type": "multipart/form-data", // Asegúrate de que estás enviando formData correctamente
      },
    };

    return config;
  } catch (error) {
    console.error("Error al obtener la sesión de Supabase:", error);
    throw new Error("No se pudo obtener la sesión de autenticación");
  }
};
