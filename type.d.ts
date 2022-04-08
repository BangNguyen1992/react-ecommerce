export interface ProductType {
  id: string
  name: string
  status: string
  price: number
  description?: string
  image: {
    id: string
    altText?: string
    image: {
      publicUrlTransformed: string
    }
  }
}
