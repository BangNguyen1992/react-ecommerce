import React, { useState } from 'react'
import useForm from '../lib/useForm'
import Form from './styles/Form'

export default function CreateProduct() {
  const [isLoading, setIsLoading] = useState(false)
  const { inputs, handleChange, resetForm } = useForm({
    image: '',
    name: '',
    price: 0,
    description: '',
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(inputs)
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <fieldset aria-busy={isLoading}>
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
                // @ts-expect-error File type doesnt need value
                value={inputs[name] ?? ''}
                onChange={handleChange}
                disabled={isLoading}
              />
            ) : (
              <textarea
                id={name}
                name={name}
                required={required}
                placeholder={placeholder}
                // @ts-expect-error File type doesnt need value
                value={inputs[name] ?? ''}
                onChange={handleChange}
                disabled={isLoading}
              />
            )}
          </label>
        ))}

        <button type="submit">+ Add Product</button>

        <button type="button" onClick={resetForm}>
          Reset Form
        </button>
      </fieldset>
    </Form>
  )
}
