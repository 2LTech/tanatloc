/** @module App.Layout */

import { ConfigProvider } from 'antd'
// import { CookiesProvider } from 'react-cookie'

import MathJax from '@/components/assets/mathjax/index.server'
// import Cookies from '@/components/assets/cookies'
// import GoogleTag from '@/components/assets/gtag'

import theme from '@/styles/theme'

import '@/styles/index.css'
import '@/styles/fonts.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tanatloc'
}

/**
 * Global App component
 * @param props Props
 */
const App = ({ children }: { children: React.ReactNode }) => {
  /**
   * Render
   */
  return (
    <html lang="en">
      <body>
        {/* <CookiesProvider>*/}
        <ConfigProvider theme={theme}>
          <MathJax.Head />
          {children}

          {/* <Cookies />
        <GoogleTag /> */}
        </ConfigProvider>
        {/* 
    </CookiesProvider> */}
      </body>
    </html>
  )
}

export default App
