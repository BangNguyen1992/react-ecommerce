import React from 'react'
import styled from 'styled-components'
// import useForm from '../lib/useForm'
import { ProductImageType } from '../type'

const StyledImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: contain;
`

interface Props {
  image: ProductImageType
}

export default function ProductImage({ image }: Props) {
  // const { inputs, handleChange } = useForm({ image })

  return (
    <label htmlFor="image">
      Image
      <StyledImage src={image?.image?.publicUrlTransformed} alt={image?.altText || 'alt'} />
      <input type="file" id="image" name="image" onChange={() => {}} />
    </label>
  )
}
