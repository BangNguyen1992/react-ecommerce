import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import Product from '../../components/Product'
import { fakeItem } from '../../lib/utilities/testUtils'

const mockProduct = fakeItem()

describe('<Product/>', () => {
  test('should render the price tag and title', () => {
    const { container, debug } = render(
      <MockedProvider>
        <Product product={mockProduct} />
      </MockedProvider>,
    )
    const link = container.querySelector('a')
    expect(link).toHaveAttribute('href', '/product/abc123')
    expect(link).toHaveTextContent(mockProduct.name)

    expect(screen.getByText('$50')).toBeInTheDocument()
  })
})
