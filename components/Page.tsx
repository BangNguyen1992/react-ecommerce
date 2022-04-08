import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import Header from './Header'
import { GlobalStyles } from './styles/Global'

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`

const Page: React.FC<PropsWithChildren<{ cool?: string }>> = function ({ children, cool }) {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </div>
  )
}

export default Page
