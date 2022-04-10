import { useMutation } from '@apollo/client'
import React from 'react'
import useSnackbar from '../lib/custom-hooks/useSnackbar'
import { DELETE_PRODUCT_MUTATION } from '../lib/mutation/deleteProduct'
import { ALL_PRODUCTS_QUERY } from '../lib/query/allProductsQuery'
import Snackbar from './Snackbar'

interface Props {
  id: string
  name: string
  children: React.ReactChild
}

export default function DeleteProduct({ id, name, children }: Props) {
  const { isActive, message, openSnackbar, closeSnackbar } = useSnackbar()
  const [deleteProduct, { loading, error }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
  })

  async function deleteProductHandler() {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to remove the product: ${name}`)) {
      try {
        await deleteProduct()
        openSnackbar('Deleted product')
      } catch (err) {
        alert(err.message)
        console.error('Apollo error: ', error)
      }
    }
  }

  return (
    <>
      <button type="button" disabled={loading} onClick={() => deleteProductHandler()}>
        {children}
      </button>
      <Snackbar isActive={isActive} message={message} onClick={closeSnackbar} />
    </>
  )
}
