import { useMutation } from '@apollo/client'
import router from 'next/router'
import React from 'react'
import { SIGN_OUT_MUTATION } from '../lib/mutation/signOutMutation'
import { CURRENT_USER_QUERY } from '../lib/query/currentUserQuery'

export default function SignOut() {
  const [signOut] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })

  async function handleSignOut() {
    await signOut()
    router.push('/signin')
  }
  return (
    <button type="button" onClick={() => handleSignOut()}>
      Sign Out
    </button>
  )
}
