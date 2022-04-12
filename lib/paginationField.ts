import { FieldFunctionOptions, FieldPolicy } from '@apollo/client/cache/inmemory/policies'
import { PAGINATION_QUERY } from './query/paginationQuery'

interface PaginationResponse {
  _allProductsMeta?: {
    count?: number
  }
}

export default function paginationField(): FieldPolicy {
  return {
    keyArgs: false,
    // eslint-disable-next-line @typescript-eslint/default-param-last
    read(existing = [], { args, cache }: FieldFunctionOptions) {
      const { skip, first: producstPerPage } = args

      // Read the number of products on the page from cache
      const data: PaginationResponse = cache.readQuery({ query: PAGINATION_QUERY })
      const currentPage = skip / producstPerPage + 1
      const totalProducts = data?._allProductsMeta?.count
      const totalPages = Math.ceil(totalProducts / producstPerPage)

      // Check if we have existing gproducts
      const products = existing.slice(skip, skip + producstPerPage).filter(Boolean)
      // If we have product & not enough for a page & on the last page -> return the products
      if (products.length && products.length !== producstPerPage && currentPage === totalPages)
        return products
      // If we dont have enough products -> Go fetch some
      if (products.length !== producstPerPage) return false
      // If we have products -> return them from cache
      if (products.length) return products

      // Set default to fetch data
      return false
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args
      const merged = existing ? [...existing] : []

      // eslint-disable-next-line no-plusplus
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip]
      }

      return merged
    },
  }
}
