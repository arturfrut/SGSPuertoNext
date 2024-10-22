import { UserInterface } from "@/app/api/register_user/route"
import { CompanyOptionsInterface } from "@/components/createShip"
import { ShipOptionInterface } from "@/components/createUser"
import { have_ships, roles } from "@/mocks/localStorageShips"
import useGlobalStore from "@/stores/useGlobalStore"
import axios from "axios"
import { useState, useEffect } from "react"

const useCreateUser = () => {
  const [companyOptions, setCompanyOptions] = useState<
  CompanyOptionsInterface[]
>([])
const [shipOptions, setShipOptions] = useState<ShipOptionInterface[]>([])
const [isVisible, setIsVisible] = useState(false)
const [waitingResponse, setWaitingResponse] = useState(false)
const [loadingCompany, setLoadingCompany] = useState(true)
const [loadingShip, setLoadingShip] = useState(true)
const { userData } = useGlobalStore()
const { id } = userData
const initialValue = {
  name: '',
  email: '',
  cellphone_number: '',
  document_number: '',
  document_type: 'DNI',
  city: '',
  nationality: '',
  roles: [],
  comments: '',
  ships_in_charge: [], // Inicializamos como arreglo vacío
  password: '', // Inicializamos la contraseña
  chargedBy: id,
  company: null
}
const [user, setUser] = useState<UserInterface>(initialValue)

useEffect(() => {
  fetchCompanies()
}, [])

useEffect(() => {
  user.company && fetchShips()
}, [user.company])

const fetchShips = async () => {
  try {
    const { data } = await axios.get(`/api/get_ships/${user.company}`)
    setShipOptions(data)
  } catch (error) {
    console.error('Error fetching ships:', error)
  } finally {
    setLoadingShip(false)
  }
}

const fetchCompanies = async () => {
  try {
    const { data } = await axios.get(`/api/get_companies`)
    setCompanyOptions(data)
  } catch (error) {
    console.error('Error fetching companies:', error)
  } finally {
    setLoadingCompany(false)
  }
}

const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target
  setUser(prevState => ({
    ...prevState,
    [name]: value
  }))
}

const toggleVisibility = () => setIsVisible(!isVisible);


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setWaitingResponse(true)
  console.log(user)
  try {
    const response = await axios.post('/api/register_user', user)
    console.log('Company created successfully:', response.data)
    console.log('USER', user)
  
    alert('Usuario registrado')
    setWaitingResponse(false)
    setUser(initialValue)
  } catch (error) {
    console.error('mensaje', error.response.data.error)
    console.error('Error creating user:', error)
    alert('Error al registrar usuario')
    if ( error.response.data.error ==='duplicate key value violates unique constraint "users_document_number_key"'){
      alert('Existe un usuario con este número de documento')
    }
    if (error.response.data.error === 'User already registered') {
      alert('El usuario ya existe')
    }
    setWaitingResponse(false)
  }
}

const handleCheckboxChange = (newSelectedValues: string[]) => {
  setUser(prevState => ({
    ...prevState,
    roles: newSelectedValues
  }))
}

const handleCheckboxChangeShip = (newSelectedValues: string[]) => {
  setUser(prevState => ({
    ...prevState,
    ships_in_charge: newSelectedValues
  }))
}
const handleCompany = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  setUser(prevState => ({
    ...prevState,
    company: e.target.value
  }))
}

// const haveCompaniesAsString = have_companies.map(String)

// const renderCompanies = user.roles.some(role =>
//   haveCompaniesAsString.includes(role)
// )

const haveShipsAsString = have_ships.map(String)

const renderShips = user.roles.some(role => haveShipsAsString.includes(role))

const formFields = [
  { name: 'name', placeholder: 'nombre y apellido' },
  { name: 'email', placeholder: 'Email', type: 'email' },
  {
    name: 'cellphone_number',
    placeholder: 'Número de celular',
    type: 'number'
  },
  {
    name: 'document_number',
    placeholder: 'Número de documento',
    type: 'number'
  },
  { name: 'document_type', placeholder: 'Tipo de documento' },
  { name: 'city', placeholder: 'Ciudad' },
  { name: 'nationality', placeholder: 'Nacionalidad' },
  {
    name: 'company'
  },
  {
    name: 'role_id',
    placeholder: 'roles',
    values: roles
  },

  { name: 'ships' },
  { name: 'comments', placeholder: 'Comentarios' },
  {
    name: 'password'
  }
]


return {
  user,
  setUser,
  formFields,
  handleInputChange,
  toggleVisibility,
  handleSubmit,
  handleCheckboxChange,
  handleCheckboxChangeShip,
  handleCompany,
  isVisible,
  waitingResponse,
  loadingCompany,
  loadingShip,
  renderShips,
  companyOptions,
  shipOptions
}
}

export default useCreateUser;