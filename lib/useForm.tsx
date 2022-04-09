import { ChangeEvent, useEffect, useState } from 'react'

export default function useForm(initial: Record<string, any | string | number | File> = {}) {
  const [inputs, setInputs] = useState(initial)
  const initialValues = Object.values(initial).join('')

  useEffect(() => {
    setInputs(initial)
  }, [initialValues])

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = e.target
    let inputValue: string | number | File

    switch (type) {
      case 'file':
        [inputValue] = (e.target as HTMLInputElement).files
        break

      case 'number':
        inputValue = Number(value)
        break

      default:
        inputValue = value
    }

    setInputs({
      ...inputs,
      [name]: inputValue,
    })
  }

  function resetForm() {
    setInputs(initial)
  }

  return {
    inputs,
    handleChange,
    resetForm,
  }
}
