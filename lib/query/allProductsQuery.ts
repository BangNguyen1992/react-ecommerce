import gql from 'graphql-tag'

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
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
