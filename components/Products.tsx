import React from 'react'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import { ALL_PRODUCTS_QUERY } from '../lib/query/allProductsQuery'
import { ProductType } from '../type'
import Product from './Product'
import { perPage } from '../config'

interface AllProducts {
  allProducts: ProductType[]
}

const ProductList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`

export default function Products({ page }: { page: number }) {
  const { data, error, loading } = useQuery<AllProducts>(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ProductList>
      {data.allProducts.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </ProductList>
  )
}
