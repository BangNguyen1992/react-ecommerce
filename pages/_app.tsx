import NProgress from 'nprogress'
import Router from 'next/router'
import React from 'react'
import { NextPage } from 'next'
import { ApolloClient, ApolloProvider } from '@apollo/client'
import Page from '../components/Page'
import '../components/styles/nprogress.css'
import withData from '../lib/withData'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

interface PageProps {
  query?: string
}

interface Props {
  Component?: React.ComponentType<PageProps>
  pageProps: unknown & PageProps
  apollo?: ApolloClient<unknown>
}

const MyApp: NextPage<Props> = function ({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  )
}

// @ts-expect-error Custom getInitialProps
MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps: unknown & { query?: string } = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  pageProps.query = ctx.query
  return { pageProps }
}

export default withData(MyApp)
