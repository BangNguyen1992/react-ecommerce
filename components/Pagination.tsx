import { useQuery } from '@apollo/client'
import Head from 'next/head'
import Link from 'next/link'
import router from 'next/router'
import React, { useEffect, useState } from 'react'
import { perPage } from '../config'
import { PAGINATION_QUERY } from '../lib/query/paginationQuery'
import DisplayError from './ErrorMessage'
import PaginationStyles from './styles/PaginationStyles'

interface Props {
  page: number
}
export default function Pagination({ page }: Props) {
  const [currentPage, setCurrentPage] = useState(page)
  const { data, loading, error } = useQuery<{ _allProductsMeta: { count: number } }>(
    PAGINATION_QUERY,
  )

  const count = data?._allProductsMeta?.count
  const totalPageCount = Math.ceil(count / perPage)

  useEffect(() => {
    if (currentPage > totalPageCount) {
      setCurrentPage(totalPageCount)
      router.push({
        pathname: `/products/${totalPageCount}`,
      })
    }
  }, [totalPageCount])

  if (loading) return <div>Loading...</div>
  if (error) return <DisplayError error={error.message} />

  return (
    <PaginationStyles>
      <Head>
        <title>
          Stick Fits - Page {currentPage} of {totalPageCount}
        </title>
      </Head>
      <Link href={`/products/${currentPage - 1}`}>
        <a aria-disabled={currentPage < 2}>🢀 Prev</a>
      </Link>
      <p>
        Page {currentPage} of {totalPageCount}
      </p>
      <p>{totalPageCount} pages total</p>
      <Link href={`/products/${currentPage + 1}`}>
        <a aria-disabled={currentPage >= totalPageCount}>Next 🢂</a>
      </Link>
    </PaginationStyles>
  )
}
