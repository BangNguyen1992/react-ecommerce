import gql from 'graphql-tag'

export const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    product: Product(where: { id: $id }) {
      id
      name
      status
      price
      description
      image {
        id
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`
