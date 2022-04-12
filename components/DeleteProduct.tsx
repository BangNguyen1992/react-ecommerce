import { FetchResult, useMutation } from '@apollo/client'
import React from 'react'
import { perPage } from '../config'
import useSnackbar from '../lib/custom-hooks/useSnackbar'
import { DELETE_PRODUCT_MUTATION } from '../lib/mutation/deleteProduct'
import { ALL_PRODUCTS_QUERY } from '../lib/query/allProductsQuery'
import { PAGINATION_QUERY } from '../lib/query/paginationQuery'
import Snackbar from './Snackbar'

interface Props {
  id: string
  name: string
  page: number
  children: React.ReactChild
}

export default function DeleteProduct({ id, name, page, children }: Props) {
  const { isActive, message, openSnackbar, closeSnackbar } = useSnackbar()
  const [deleteProduct, { loading, error }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    // Remove item from Apollo cache
    update: (cache, { data }: FetchResult) => {
      cache.evict({ id: cache.identify(data.deleteProduct) })
    },
    refetchQueries: [
      // Refetch the current page the product
      {
        query: ALL_PRODUCTS_QUERY,
        variables: {
          skip: page * perPage - perPage,
          first: perPage,
        },
      },
      // Refetch the total page count
      { query: PAGINATION_QUERY },
    ],
  })

  async function deleteProductHandler() {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to remove the product: ${name}`)) {
      try {
        await deleteProduct()
        openSnackbar('Deleted product')
      } catch (err) {
        console.error(err.message)
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
