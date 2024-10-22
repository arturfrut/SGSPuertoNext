import { rolesForDev } from '@/constants/roles'
import supabase from '@/lib/supabase'
import useGlobalStore from '@/stores/useGlobalStore'
import axios from 'axios'
import { useState } from 'react'

export const useLogin = (setIsLogged: (arg0: boolean) => void) => {
  const [isVisible, setIsVisible] = useState(false)
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState<string | null>(null)
  const [loadingData, setLoadingData] = useState(false)
  const {
    setUserData: setUserdataStore,
    setShips,
    setRoles,
    setRolSelected,
    setSelectedShip,
    setCompanies,
    setUserSign
  } = useGlobalStore()
  const toggleVisibility = () => setIsVisible(!isVisible)

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.username,
      password: userData.password
    })

    if (error) {
      setError(error.message)
      return false
    }

    if (data.session) {
      const token = data.session.access_token

      try {
        setLoadingData(true)
        const userInfoResponse = await axios.get('/api/users', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })

        const userInfo = userInfoResponse.data
        console.log('SETEANDO USER INFO', userInfo)

        if (userInfoResponse.status === 200) {
          console.log('userINFO', userInfo)

          setUserdataStore(userInfo)
          // setShips(mockShips)

          // caso developer
          const signRes = await axios.get(`/api/get_user_sign/${userInfo.id}`)
          if (signRes.status === 200) {
            const { data } = signRes
            setUserSign(data[0])
          } else {
            alert(`Error al obtener su firma`)
            setError('Error fetching sign')
          }

          if (userInfo.roles.includes(0)) {
            console.log('userINFO', userInfo)
            const devRoles = rolesForDev.map(role => role.rolName)
            setRoles(devRoles)
            setRolSelected('developer')
            const compamiesRes = await axios.get(`/api/get_companies`)
            if (compamiesRes.status === 200) {
              const { data } = compamiesRes
              setCompanies(data)
            } else {
              alert(`Error al obtener compañias:`)
              setError('Error fetching companies')
            }
          }

          // caso administrador

          if (userInfo.roles.includes(1)) {
            console.log('userINFO', userInfo)
            setRolSelected('administrador')
            const compamiesRes = await axios.get(`/api/get_companies`)
            if (compamiesRes.status === 200) {
              const { data } = compamiesRes
              setCompanies(data)
            } else {
              alert(`Error al obtener compañias:`)
              setError('Error fetching companies')
            }
          }

          // caso capitan

          if (userInfo.roles.includes(8)) {
            setRolSelected('capitan')
            setShips(userInfo.ships_in_charge)
            const shipResponse = await axios.get(
              `/api/get_ship_by_id/${userInfo.ships_in_charge[0]}`
            )

            if (shipResponse.status === 200) {
              const { data } = shipResponse
              const shipData = {
                idOMI: data.omi,
                name: data.ship_name,
                company: data.company,
                matricula: data.matricula,
                type: data.ship_type
              }

              setSelectedShip(shipData)
            } else {
              alert(
                `Error al obtener información del barco: ${userInfo.ships_in_charge[0]}`
              )
              setError('Error fetching ship data')
            }

            const crewRes = await axios.get(
              `/api/get_crew_by_ship/${userInfo.ships_in_charge[0]}`
            )
            const crewData = await crewRes.data
            if (crewData.length) {
              const { data } = crewData
              setCompanies(data)
            } else {
              alert(`Error al obtener tripulación:`)
              setError('Error fetching crew')
            }
          }

          localStorage.setItem('isLogged', JSON.stringify(true))
          setIsLogged(true)
          setLoadingData(false)
          return true
        } else {
          setError(userInfo.message || 'Error fetching user data')
          return false
        }
      } catch (error) {
        setError('Error fetching user data')
        setLoadingData(false)
        return false
      }
    }
  }

  return {
    toggleVisibility,
    handleLogin,
    userData,
    setUserData,
    error,
    isVisible,
    loadingData
  }
}
