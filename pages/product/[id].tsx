import React from 'react'
import { useQuery } from '@apollo/client'
import { SINGLE_PRODUCT_QUERY } from '../../lib/query/singleProductQuery'
import { ProductType } from '../../type'
import SingeProduct from '../../components/SingleProduct'
import DisplayError from '../../components/ErrorMessage'

interface Props {
  query: {
    id: string
  }
}

interface Product {
  product: ProductType
}

export default function SingeProductPage({ query: { id } }: Props) {
  const { data, loading, error } = useQuery<Product>(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  })

  if (loading) <div>Loading...</div>
  if (error) <DisplayError error={error} />

  return !!data?.product && <SingeProduct product={data.product} />
}
