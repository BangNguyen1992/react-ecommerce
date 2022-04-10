import Link from 'next/link'
import React from 'react'
import formatMoney from '../lib/utilities/formatMoney'
import { ProductType } from '../type'
import DeleteProduct from './DeleteProduct'
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
        <Link href={`/product/${id}`}>{name}</Link>
      </Title>
      <PriceTag>{formatMoney(price)}</PriceTag>
      <p>{description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: '/update',
            query: { id },
          }}
        >
          <button type="button">Edit</button>
        </Link>

        <DeleteProduct id={id} name={name}>
          Delete
        </DeleteProduct>
      </div>
    </ItemStyles>
  )
}
