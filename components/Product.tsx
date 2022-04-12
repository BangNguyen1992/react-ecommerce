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
  page: number
}

export default function Product({
  product: {
    id,
    name,
    price,
    description,
    image,
  },
  page,
}: Props) {
  return (
    <ItemStyles>
      <img src={image?.image.publicUrlTransformed} alt={name} />
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
          <button type="button">&#128221; Edit</button>
        </Link>

        <DeleteProduct id={id} name={name} page={page}>
          &#10060; Delete
        </DeleteProduct>
      </div>
    </ItemStyles>
  )
}
