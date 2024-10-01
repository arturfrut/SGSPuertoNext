import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

export interface UserInterface {
  chargedBy: number,
  name: string
  email: string
  cellphone_number: string
  document_number: string
  document_type: string
  city: string
  nationality: string
  roles: string[]
  comments: string
  password: string
  company?: string // Arreglo para manejar las compañías seleccionadas
  ships_in_charge?: string[] // Arreglo para manejar los barcos seleccionados
}


export async function POST(request: Request) {
  try {
    const userData: UserInterface = await request.json();

    const {
      chargedBy,
      name,
      email,
      cellphone_number,
      document_number,
      document_type,
      city,
      nationality,
      roles,
      comments,
      ships_in_charge,
      company,
      password = ''
    } = userData;

    // Crear el usuario en la autenticación de Supabase
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password
    });

    if (signUpError) {
      throw signUpError;
    }

    const user = data.user;

    if (!user) {
      throw new Error('User creation failed');
    }

    // Insertar el usuario en la tabla de la base de datos
    const { error: insertError } = await supabase
      .from('users')
      .insert([
        {
          chargedBy,
          name,
          email,
          cellphone_number,
          document_number,
          document_type,
          city,
          nationality,
          roles,
          comments,
          ships_in_charge,
          company,
          uid: user.id // Asocia el ID del usuario creado en la autenticación
        }
      ]);

    if (insertError) {
      // Si la inserción falla, eliminar el usuario creado en Supabase Auth
      const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);

      if (deleteError) {
        console.error('Failed to delete user from Supabase Auth:', deleteError);
      }

      throw insertError; // Lanzar el error para que sea capturado en el bloque catch
    }

    return NextResponse.json({ message: 'User registered successfully' });
  } catch (error: any) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// export async function POST(request: Request) {
//   try {
//     const userData: UserInterface = await request.json();

//     const {
//       name,
//       last_name,
//       email,
//       cellphone_number,
//       document_number,
//       document_type,
//       age,
//       city,
//       nationality,
//       roles,
//       comments,
//       ships_in_charge,
//       company,
//       password = ''
//     } = userData;

//     // Mockeando el user.id
//     const user = { id: '658cdac1-ae78-4ab8-aae5-1c17498d97b7' };

//     // Insertar el usuario en la tabla de la base de datos
//     const { error: insertError } = await supabase
//       .from('users')
//       .insert([
//         {
//           name,
//           last_name,
//           email,
//           cellphone_number,
//           document_number,
//           document_type,
//           age,
//           city,
//           nationality,
//           roles,
//           comments,
//           ships_in_charge,
//           company,
//           uid: user.id // Usando el ID mockeado
//         }
//       ]);

//     if (insertError) {
//       throw insertError;
//     }

//     return NextResponse.json({ message: 'User registered successfully' });
//   } catch (error: any) {
//     console.error('Error registering user:', error);
//     return NextResponse.json(
//       { error: error.message },
//       { status: 500 }
//     );
//   }
// }