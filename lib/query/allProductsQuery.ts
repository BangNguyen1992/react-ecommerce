import gql from 'graphql-tag'

export const ALL_PRODUCTS_QUERY = gql`
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
