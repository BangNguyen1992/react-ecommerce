import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import router from 'next/router'
import DisplayError from './ErrorMessage'
import Form from './styles/Form'
import useForm from '../lib/custom-hooks/useForm'
import { SIGNIN_MUTATION } from '../lib/mutation/signInMutation'
import { CURRENT_USER_QUERY } from '../lib/query/currentUserQuery'

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({ email: '', password: '' })
  const [authenticateUserWithPassword, { loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })
  const [error, setError] = useState()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const { data } = await authenticateUserWithPassword()
      const errMessage = data?.authenticateUserWithPassword?.message

      if (errMessage) {
        setError(errMessage)
        return
      }
      router.push('/products')
    } catch (networkError) {
      console.error('SignIn: ', networkError)
    }
  }
  return (
    <Form method="POST" onSubmit={(e) => handleSubmit(e)}>
      <h2>Signin to your account</h2>

      <DisplayError error={{ message: error }} />
      <fieldset aria-busy={loading}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Email address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Email
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Signin</button>
      </fieldset>
    </Form>
  )
}
