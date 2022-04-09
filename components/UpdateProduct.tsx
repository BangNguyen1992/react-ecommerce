import { useMutation, useQuery } from '@apollo/client'
import React, { FormEvent } from 'react'
import { UPDATE_PRODUCT_MUTATION } from '../lib/mutation/updateProduct'
import { SINGLE_PRODUCT_QUERY } from '../lib/query/singleProductQuery'
import useForm from '../lib/useForm'
import { ProductType } from '../type'
import DisplayError from './ErrorMessage'
import ProductImage from './ProductImage'
import Form from './styles/Form'

const fields = [
  {
    component: 'input',
    name: 'name',
    type: 'text',
    required: true,
    placeholder: 'Product name',
    label: 'Name',
  },
  {
    component: 'input',
    name: 'price',
    type: 'number',
    required: true,
    placeholder: 'Product price',
    label: 'Price',
  },
  {
    component: 'textarea',
    name: 'description',
    type: 'text',
    required: false,
    placeholder: 'Product description',
    label: 'Descriptiom',
  },
]

// TODO: Update product's image
/**
 * CREATE NEW IMAGE
 * 1. Display current product image
 * 2. Select new image source
 * 3. Replace current image wiht new image Blob -> URL.createObjectURL
 * 4. Create new updateProduct mutation which has image type "image: { create: { image: Upload, altText: String } }"
 * 5. If no image change -> Run updateProduct without image param
 * 6. If image had changed -> Run updateProduct that created in step 4
 *
 * CONNECT WITH EXISTING IMAGE
 * 1. Display current product image
 * 2. Open new modal which displays all existing images -> select image
 * 3. Replace current image wiht new selected existing image's publicUrlTransformed
 * 4. Create new updateProduct mutation which has image type "image: { connect: { id: ID! } }"
 * 5. If no image change -> Run updateProduct without image param
 * 6. If image had changed -> Run updateProduct that created in step 4
 */

export default function UpdateProduct({ id }: { id: string }) {
  const { data, loading, error } = useQuery<{ product: ProductType }>(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  })

  const [updateProduct, { data: updateData, loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_PRODUCT_MUTATION)

  const { inputs, handleChange } = useForm(data?.product)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const { name, price, description, status } = inputs
      await updateProduct({
        variables: { id, name, price, description, status },
        refetchQueries: [{ query: SINGLE_PRODUCT_QUERY, variables: { id } }],
      })
    } catch {
      console.error('error', updateError)
    }
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <DisplayError error={error || updateError} />

      <fieldset aria-busy={loading || updateLoading}>
        {fields.map(({ component, name, type, required, placeholder, label }) => (
          <label key={name} htmlFor={name}>
            {label}
            {component === 'input' ? (
              <input
                type={type}
                id={name}
                name={name}
                required={required}
                placeholder={placeholder}
                value={inputs[name] ?? ''}
                onChange={handleChange}
                disabled={loading || updateLoading}
              />
            ) : (
              <textarea
                id={name}
                name={name}
                required={required}
                placeholder={placeholder}
                value={inputs[name] ?? ''}
                onChange={handleChange}
                disabled={loading || updateLoading}
              />
            )}
          </label>
        ))}

        <label htmlFor="status">
          Status
          <select id="status" name="status" value={inputs.status} onChange={handleChange}>
            <option value="DRAFT">Draft</option>
            <option value="AVAILABLE">Available</option>
            <option value="UNAVAILABLE">Unavailable</option>
          </select>
        </label>

        <ProductImage image={inputs.image} />

        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  )
}
