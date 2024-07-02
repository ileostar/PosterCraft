import '../styles/uno.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import DefaultLayout from '../layouts/DefaultLayout'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'



type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return getLayout(<Component {...pageProps} />)
}

export default MyApp
