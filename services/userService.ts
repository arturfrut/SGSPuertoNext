import { UserInterface } from "@/app/api/register_user/route";
import supabase from "@/lib/supabase";

export const registerUser = async (
  email: string,
  password: string,
  userData: UserInterface
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  const { user } = data;

  const { error: insertError } = await supabase
    .from('users')
    .insert({
      uid: user?.id,
      ...userData,
    });

  if (insertError) {
    throw new Error(insertError.message);
  }

  return user;
};