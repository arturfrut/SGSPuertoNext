import useAllCompanies from '@/app/hooks/useAllCompanies'
import { rolesForDev } from '@/constants/roles'
import supabase from '@/lib/supabase'
import { userShipsData } from '@/mocks/localStorageShips'
import useGlobalStore from '@/stores/useGlobalStore'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const useLogin = (setIsLogged: (arg0: boolean) => void) => {
  const mockShips = userShipsData
  const [isVisible, setIsVisible] = useState(false)
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState<string | null>(null)

  const {
    setUserData: setUserdataStore,
    userData: userDataStore,
    setShips,
    setRoles,
    setRolSelected,
  } = useGlobalStore()
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
        })

        const userInfo = userInfoResponse.data
        console.log(userInfo)

        if (userInfoResponse.status === 200) {
          setUserdataStore(userInfo)
          setShips(mockShips)

          if (userInfo.roles.includes(0)) {
            console.log('userINFO', userInfo)
            const devRoles = rolesForDev.map(role => role.rolName)
            setRoles(devRoles)
            setRolSelected('developer')
          }

          localStorage.setItem('isLogged', JSON.stringify(true))
          // localStorage.setItem('shipsData', JSON.stringify(mockShips))

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