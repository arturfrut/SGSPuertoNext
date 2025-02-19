import { CompanyInterface } from '@/components/createCompany'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const COMPANIES_QUERY_KEY = ['companies']

export const useCompaniesQuery = () => {
  return useQuery({
    queryKey: COMPANIES_QUERY_KEY,
    queryFn: async () => {
      const { data } = await axios.get('/api/get_companies')
      return data
    }
  })
}

export const useCreateCompanyMutation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (company: CompanyInterface) => {
      const { data } = await axios.post('/api/register_company', company)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMPANIES_QUERY_KEY })
    }
  })
}