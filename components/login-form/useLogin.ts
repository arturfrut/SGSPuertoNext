import supabase from '@/lib/supabase'
import { userShipsData } from '@/mocks/localStorageShips'
import { useState } from 'react'

export const useLogin = (setIsLogged: (arg0: boolean) => void) => {
  const mockShips = userShipsData
  const [isVisible, setIsVisible] = useState(false)
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState<string | null>(null)

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
        const response = await fetch('/api/users', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })

        const userInfo = await response.json()

        if (response.ok) {
          localStorage.setItem('user', JSON.stringify(userInfo))
          localStorage.setItem('isLogged', JSON.stringify(true))
          localStorage.setItem('voyage', JSON.stringify(1)) // ESTE NO DEBERÍA IR
          localStorage.setItem('shipsData', JSON.stringify(mockShips))
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
