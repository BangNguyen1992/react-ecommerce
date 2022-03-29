// Custom `App` component to initialize pages
// https://nextjs.org/docs/advanced-features/custom-app

import { ApolloProvider } from '@apollo/client'
import Page from '../components/Page'
import withData from '../lib/withData'

const MyApp = ({ Component, pageProps, apollo }) => {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  // this exposes the query to the user
  pageProps.query = ctx.query
  return { pageProps }
}

export default withData(MyApp)

// import App, { Container } from 'next/app';
// import Page from '../components/Page';
// import { ApolloProvider } from '@apollo/client';
// import withData from '../lib/withData';

// class MyApp extends App {
//   static async getInitialProps({ Component, ctx }) {
//     let pageProps = {};
//     if (Component.getInitialProps) {
//       pageProps = await Component.getInitialProps(ctx);
//     }
//     // this exposes the query to the user
//     pageProps.query = ctx.query;
//     return { pageProps };
//   }
//   render() {
//     const { Component, apollo, pageProps } = this.props;
//     console.log('object apollo', this.props)
//     return (
//       <Container>
//         <ApolloProvider client={apollo}>
//           <Page>
//             <Component {...pageProps} />
//           </Page>
//         </ApolloProvider>
//       </Container>
//     );
//   }
// }

// export default withData(MyApp);
