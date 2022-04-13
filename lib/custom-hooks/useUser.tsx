import { useQuery } from '@apollo/client'
import { AuthenticatedItem } from '../../type'
import { CURRENT_USER_QUERY } from '../query/currentUserQuery'

export default function useUser() {
  const { data } = useQuery<{ authenticationItem: AuthenticatedItem }>(CURRENT_USER_QUERY)
  return data?.authenticationItem
}
