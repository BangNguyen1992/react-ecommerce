import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import { ProductType } from '../type'

const StyledProduct = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  /* min-height: 80rem; */
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: center;
  gap: 2rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export default function SingeProduct({
  product: {
    name,
    price,
    description,
    image: { image, altText },
  },
}: {
  product: ProductType
}) {
  return (
    <StyledProduct>
      <Head>
        <title>Sick Fits | {name}</title>
      </Head>
      <img src={image.publicUrlTransformed} alt={altText} />

      <div className="defailts">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </StyledProduct>
  )
}
