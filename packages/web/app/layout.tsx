import type { Metadata } from 'next'

import { ConfigProvider } from 'antd'
import { AntdRegistry } from '@ant-design/nextjs-registry'

import MathJax from '@/components/assets/mathjax/index.server'

import theme from '@/styles/theme'
import '@/styles/index.css'

export const metadata: Metadata = {
  title: 'Tanatloc',
  description: 'See the world the way it really is!'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <MathJax.Head />
        <AntdRegistry>
          <ConfigProvider theme={theme}>{children}</ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
