import { useQuery } from '@apollo/client'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { perPage } from '../config'
import { PAGINATION_QUERY } from '../lib/query/paginationQuery'
import DisplayError from './ErrorMessage'
import PaginationStyles from './styles/PaginationStyles'

interface Props {
  page: number
}
export default function Pagination({ page }: Props) {
  const { data, loading, error } = useQuery<{ _allProductsMeta: { count: number } }>(
    PAGINATION_QUERY,
  )

  if (loading) return <div>Loading...</div>
  if (error) return <DisplayError error={error.message} />

  const { count } = data._allProductsMeta
  const totalPageCount = Math.ceil(count / perPage)
  return (
    <PaginationStyles>
      <Head>
        <title>
          Stick Fits - Page {page} of {totalPageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page < 2}>🢀 Prev</a>
      </Link>
      <p>
        Page {page} of {totalPageCount}{' '}
      </p>
      <p>{totalPageCount} pages total</p>
      <Link href={`/products/${Number(page) + 1}`}>
        <a aria-disabled={page >= totalPageCount}>Next 🢂</a>
      </Link>
    </PaginationStyles>
  )
}
