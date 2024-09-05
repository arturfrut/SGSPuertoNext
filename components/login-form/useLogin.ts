import supabase from '@/lib/supabase'
import { userShipsData } from '@/mocks/localStorageShips'
import useGlobalStore from '@/stores/useGlobalStore'
import axios from 'axios'
import { useState } from 'react'

export const useLogin = (setIsLogged: (arg0: boolean) => void) => {
  const mockShips = userShipsData
  const [isVisible, setIsVisible] = useState(false)
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState<string | null>(null)
  const setShips = useGlobalStore((state) => state.setShips);

  const toggleVisibility = () => setIsVisible(!isVisible)

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.username,
      password: userData.password
    })

    if (error) {
      setError(error.message)
      return
    }

    if (data.session) {
      const token = data.session.access_token

      try {
        const userInfoResponse = await axios.get('/api/users', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        const userInfo = userInfoResponse.data;

        if (userInfoResponse.status === 200)  {
          // // Aquí haces la petición para obtener los barcos del usuario

          // const shipsResponse = await axios.get(`/api/ships/${userInfo.id}`, {
          //   headers: {
          //     'Content-Type': 'application/json',
          //     Authorization: `Bearer ${token}`
          //   }
          // });

          // const shipsData = await shipsResponse.data;

          // if (shipsResponse.status === 200) {
          //   // Guardar los barcos en el estado global usando zustand
          //   setBarcos(shipsData); // Asigna los datos de los barcos al estado global
          setShips(mockShips)
          // } else {
          //   setError('Error fetching ships data');
          // }
          

          if (true) {
            // aca llamar a la tripulación
          }

          localStorage.setItem('user', JSON.stringify(userInfo))
          localStorage.setItem('isLogged', JSON.stringify(true))
          // localStorage.setItem('shipsData', JSON.stringify(mockShips))
          


          localStorage.setItem(  // TRAER POR QUERY
            'notifications',
            JSON.stringify([
              { id: 2, date: '22/22/22' },
              { id: 4, date: '11/11/11' }
            ])
          )
          localStorage.setItem( // TRAER POR QUERY
            'expirations',
            JSON.stringify([
              { id: 6, date: '22/22/22' },
              { id: 3, date: '11/11/11' }
            ])
          )
          setIsLogged(true)
        } else {
          setError(userInfo.message || 'Error fetching user data')
        }
      } catch (error) {
        setError('Error fetching user data')
      }
    }
  }
  return {
    toggleVisibility,
    handleLogin,
    userData,
    setUserData,
    error,
    isVisible
  }
}
