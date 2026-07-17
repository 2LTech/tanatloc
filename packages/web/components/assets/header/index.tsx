import { useMemo } from 'react'
import Link from 'next/link'
import { Button, Layout, Menu, MenuProps, Popover, Typography } from 'antd'
import { BarsOutlined } from '@ant-design/icons'

import {
  scrollToAboutUs,
  scrollToBlog,
  scrollToCaseStudy,
  scrollToDevelopers,
  scrollToDoc,
  scrollToFeatures
} from '@/components/tools/scrollTo'

import Image from '@/components/assets/image'

import './index.css'

// Props
export interface Props {
  type: 'home' | 'doc' | 'blog'
}

/**
 * HomeMenu
 * @returns HomeMenu
 */
const Header: React.FunctionComponent<Props> = ({ type }) => {
  // Home Menu
  const homeMenuItems: MenuProps['items'] = useMemo(
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
          <Button type="text" onClick={scrollToDoc}>
            Doc
          </Button>
        )
      },
      {
        key: 'blog',
        label: (
          <Button type="text" onClick={scrollToBlog}>
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
    []
  )

  const homeMenu = useMemo(() => {
    if (type !== 'home') return null
    return (
      <>
        <Menu mode="horizontal" className="menu" items={homeMenuItems} />
        <div className="mobileMenuPop">
          <Popover
            content={
              <Menu
                mode="inline"
                items={homeMenuItems}
                className="mobileMenu"
              />
            }
            placement="leftBottom"
          >
            <BarsOutlined style={{ fontSize: 32 }} />
          </Popover>
        </div>
      </>
    )
  }, [type, homeMenuItems])

  const docMenu = useMemo(() => {
    if (type !== 'doc') return null
    return (
      <>
        <Typography.Title level={1}>Doc</Typography.Title>
        <Link href="https://github.com/2LTech/tanatloc" target="_blank">
          <Image
            src="/img/doc/github-mark.svg"
            width={98}
            height={96}
            alt="Github 2LTech/tanatloc"
          />
        </Link>
      </>
    )
  }, [type])

  const blogMenu = useMemo(() => {
    if (type !== 'blog') return null
    return <Typography.Title level={1}>Blog</Typography.Title>
  }, [type])

  /**
   * Render
   */
  return (
    <Layout.Header id="header" className="header">
      <Link href="/">
        <Image src="/img/logo.png" width={2831} height={371} alt="Tanatloc" />
      </Link>
      {homeMenu}
      {docMenu}
      {blogMenu}
    </Layout.Header>
  )
}

export default Header
