import { useMutation } from '@apollo/client'
import router from 'next/router'
import React from 'react'
import { CREATE_PRODUCT_MUTATION } from '../lib/mutation/createProduct'
import { ALL_PRODUCTS_QUERY } from '../lib/query/allProductsQuery'
import useForm from '../lib/custom-hooks/useForm'
import DisplayError from './ErrorMessage'
import Form from './styles/Form'


export default function CreateProduct() {
  const { inputs, handleChange, resetForm } = useForm({
    image: '',
    name: '',
    price: 0,
    description: '',
  })

  const [createProduct, { data, loading, error }] = useMutation(CREATE_PRODUCT_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
  })

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const res = await createProduct()
      resetForm()
      router.push({
        pathname: `/product/${res.data.createProduct.id}`,
      })
    } catch {
      console.error('error', error)
    }
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <DisplayError error={error} />
      <fieldset aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input type="file" id="image" name="image" onChange={handleChange} />
        </label>
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
                disabled={loading}
              />
            ) : (
              <textarea
                id={name}
                name={name}
                required={required}
                placeholder={placeholder}
                value={inputs[name] ?? ''}
                onChange={handleChange}
                disabled={loading}
              />
            )}
          </label>
        ))}

        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  )
}
