export interface ProductImageType {
  id: string
  altText?: string
  image: {
    publicUrlTransformed: string
  }
}

export interface ProductType {
  id: string
  name: string
  status: string
  price: number
  description?: string
  image: ProductImageType
}

// export interface ProductUploadPayload {
//   id: string
//   name?: string
//   price?: number
//   status?: string
//   description?: string
//   // image?: ProductType['image']
// }

export interface AuthenticatedItem {
  id: string
  name: string
  email: string
}