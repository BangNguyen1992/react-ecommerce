import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Product from '../components/Product'
import { ProductType } from '../type'

// TYPE DEFINITION
interface AllProducts {
  allProducts: ProductType[]
}

// GRAPHQL QUERY
const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      status
      price
      description
      image {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`

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
