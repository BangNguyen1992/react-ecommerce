import Link from 'next/link'
import React from 'react'
import formatMoney from '../lib/formatMoney'
import { ProductType } from '../type'
import ItemStyles from './styles/ItemStyles'
import PriceTag from './styles/PriceTag'
import Title from './styles/Title'

interface Props {
  product: ProductType
}

export default function Product({
  product: {
    id,
    name,
    price,
    description,
    image: { image },
  },
}: Props) {
  return (
    <ItemStyles>
      <img src={image.publicUrlTransformed} alt={name} />
      <Title>
        <Link href={`/products/${id}`}>{name}</Link>
      </Title>
      <PriceTag>{formatMoney(price / 100)}</PriceTag>
      <p>{description}</p>
    </ItemStyles>
  )
}
