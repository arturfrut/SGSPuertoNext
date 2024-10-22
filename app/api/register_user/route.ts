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
  company?: string
  ships_in_charge?: string[]
}

export async function POST(request: Request) {
  let user = null; // Para almacenar el usuario creado en caso de error

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
      password,
    } = userData;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Crear el usuario en la autenticación de Supabase
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      return NextResponse.json({ error: signUpError.message }, { status: 400 });
    }

    user = data.user;

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
      throw new Error(insertError.message); // Lanza el error para manejarlo más adelante
    }

    return NextResponse.json({ message: 'User registered successfully' });
  } catch (error: any) {
    console.error('Error registering user:', error);

    // Si ya se creó el usuario pero falla la inserción en la DB, eliminarlo de Supabase Auth
    if (user) {
      try {
        const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);
        if (deleteError) {
          console.error('Failed to delete user from Supabase Auth:', deleteError);
        } else {
          console.log('User deleted from Supabase Auth after failure.');
        }
      } catch (deleteException) {
        console.error('Exception during user deletion:', deleteException);
      }
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}