import supabase from "@/lib/supabase";
import useGlobalStore from "@/stores/useGlobalStore";

export const useLogout = () => {
  const { reset } = useGlobalStore();

 
  const handleLogout = async () => {
    await supabase.auth.signOut();

    // Limpiar estados globales y localStorage
    reset();
 
    

    localStorage.removeItem('user');
    localStorage.removeItem('isLogged');
    localStorage.removeItem('notifications');
    localStorage.removeItem('expirations');
    sessionStorage.removeItem('isLogged')
    sessionStorage.removeItem('isLogged')
    window.location.href = '/'

  };

  return {
    handleLogout,
  };
};
