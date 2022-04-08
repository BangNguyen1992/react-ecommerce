import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import Product from '../components/Product'
import { ProductType } from '../type'
import { ALL_PRODUCTS_QUERY } from '../lib/query/allProductsQuery'

// TYPE DEFINITION
interface AllProducts {
  allProducts: ProductType[]
}

// STYLING
const ProductList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`

// MAIN COMPONENT
export default function ProductsPage() {
  const { data, error, loading } = useQuery<AllProducts>(ALL_PRODUCTS_QUERY)
  console.log('{ data, error, loading }', { data, error, loading })

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
