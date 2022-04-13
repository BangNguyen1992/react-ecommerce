import { useQuery } from '@apollo/client'
import { UserType } from '../../type'
import { CURRENT_USER_QUERY } from '../query/currentUserQuery'

export default function useUser() {
  const { data } = useQuery<{ authenticatedItem: UserType }>(CURRENT_USER_QUERY)

  return data?.authenticatedItem
}
