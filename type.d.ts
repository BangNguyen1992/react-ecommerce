export interface ProductType {
  id: string
  name: string
  status: string
  price: number
  description?: string
  image: {
    id: string
    image: {
      publicUrlTransformed: string
    }
  }
}
