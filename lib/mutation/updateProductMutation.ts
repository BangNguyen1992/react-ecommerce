import gql from 'graphql-tag'

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $price: Int
    $status: String
    $description: String
    # $image: Upload
  ) {
    updateProduct(
      id: $id
      data: {
        name: $name
        price: $price
        description: $description
        status: $status
        # image: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      name
      price
      status
      description
    }
  }
`
