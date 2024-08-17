import supabase from '@/lib/supabase';
import { NextResponse } from 'next/server';

export interface UserInterface {
  username: string;
  name: string;
  last_name: string;
  email: string;
  cellphone_number: string;
  document_number: string;
  document_type: string;
  age: number;
  country: string;
  city: string;
  nationality: string;
  role_id: number;
  comments: string;
  password?: string;
}

export async function POST(request: Request) {
  try {
    const userData: UserInterface = await request.json();

    const {
      username,
      name,
      last_name,
      email,
      cellphone_number,
      document_number,
      document_type,
      age,
      country,
      city,
      nationality,
      role_id,
      comments,
      password = ''
    } = userData;

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

    const { error: insertError } = await supabase
      .from('users')
      .insert([
        {
          username,
          name,
          last_name,
          email,
          cellphone_number,
          document_number,
          document_type,
          age,
          country,
          city,
          nationality,
          role_id,
          comments,
          uid: user.id
        }
      ]);

    if (insertError) {
      throw insertError;
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