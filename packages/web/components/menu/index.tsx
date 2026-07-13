import { useMemo } from 'react'
import { Button, Layout, Menu, MenuProps, Popover } from 'antd'
import { BarsOutlined } from '@ant-design/icons'

import {
  scrollToAboutUs,
  scrollToBlog,
  scrollToCaseStudy,
  scrollToDevelopers,
  scrollToDoc,
  scrollToFeatures
} from '@/components/tools/scrollTo'

import './index.css'

/**
 * HomeMenu
 * @returns HomeMenu
 */
const HomeMenu: React.FunctionComponent = () => {
  // Menu
  const menuItems: MenuProps['items'] = useMemo(
    () => [
      {
        key: 'features',
        label: (
          <Button type="text" onClick={scrollToFeatures}>
            Features
          </Button>
        )
      },
      {
        key: 'caseStudy',
        label: (
          <Button type="text" onClick={scrollToCaseStudy}>
            Case Studies
          </Button>
        )
      },
      {
        key: 'aboutUs',
        label: (
          <Button type="text" onClick={scrollToAboutUs}>
            About us
          </Button>
        )
      },
      {
        key: 'doc',
        label: (
          <Button disabled type="text" onClick={scrollToDoc}>
            Doc
          </Button>
        )
      },
      {
        key: 'blog',
        label: (
          <Button disabled type="text" onClick={scrollToBlog}>
            Blog
          </Button>
        )
      },
      {
        key: 'developers',
        label: (
          <Button type="text" onClick={scrollToDevelopers}>
            Developers
          </Button>
        )
      }
    ],
    [
      scrollToFeatures,
      scrollToCaseStudy,
      scrollToAboutUs,
      scrollToDoc,
      scrollToBlog,
      scrollToDevelopers
    ]
  )

  /**
   * Render
   */
  return (
    <Layout.Header id="header" className="header">
      <img src="/images/logo.svg" alt="Tanatloc" />
      <Menu mode="horizontal" className="menu" items={menuItems} />
      <div className="mobileMenuPop">
        <Popover
          content={
            <Menu mode="inline" items={menuItems} className="mobileMenu" />
          }
          placement="leftBottom"
        >
          <BarsOutlined style={{ fontSize: 32 }} />
        </Popover>
      </div>
    </Layout.Header>
  )
}

export default HomeMenu
