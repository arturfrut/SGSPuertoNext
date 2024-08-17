import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ message: 'No token provided' }, { status: 401 });
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const { data: userInfo, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('uid', user?.id)
    .single();

  if (userError) {
    return NextResponse.json({ message: userError.message }, { status: 500 });
  }

  return NextResponse.json(userInfo, { status: 200 });
}