import { useMemo } from 'react'
import Link from 'next/link'

import { Button, Card, Divider, Layout, Space, Typography } from 'antd'

import packageJson from '@/package.json'

import {
  scrollToAboutUs,
  scrollToBlog,
  scrollToCaseStudy,
  scrollToDevelopers,
  scrollToDoc,
  scrollToFeatures,
  scrollToGetStarted
} from '@/components/tools/scrollTo'

import Image from '@/components/assets/image'

import './index.css'

// Props
export interface Props {
  type: 'home' | 'doc' | 'blog'
}

/**
 * Footer
 * @returns Footer
 */
const Footer: React.FunctionComponent<Props> = ({ type }) => {
  // Data
  const thanks = useMemo(
    () => [
      <div key="freefem">
        - Professor Fréderic Hecht, Dr. Pierre Jolivet, and the{' '}
        <Link href="https://freefem.org/" target="_blank">
          FreeFEM’s
        </Link>{' '}
        contributors
      </div>,
      <div key="gmsh">
        - Professor Christophe Geuzaine, Professor Jean-François Remacle and the{' '}
        <Link href="https://gmsh.info/" target="_blank">
          Gmsh
        </Link>{' '}
        contributors
      </div>,
      <div key="opencascade">
        - The{' '}
        <Link href="https://dev.opencascade.org/" target="_blank">
          Open Cascade
        </Link>{' '}
        development team
      </div>
    ],
    []
  )

  // Navigate
  const navigate = useMemo(
    () => [
      <Button key="features" type="text" onClick={scrollToFeatures}>
        Features
      </Button>,
      <Button key="case_studies" type="text" onClick={scrollToCaseStudy}>
        Case Studies
      </Button>,
      <Button key="about_us" type="text" onClick={scrollToAboutUs}>
        About us
      </Button>,
      <Button key="get_started" type="text" onClick={scrollToGetStarted}>
        Get started
      </Button>,
      <Button key="doc" type="text" onClick={scrollToDoc}>
        Doc
      </Button>,
      <Button key="blog" type="text" onClick={scrollToBlog}>
        Blog
      </Button>,
      <Button key="developers" type="text" onClick={scrollToDevelopers}>
        Developers
      </Button>
    ],
    []
  )

  /**
   * Render
   */
  return (
    <Layout.Footer className="footer">
      {type === 'home' ? (
        <>
          <div className="footerHead">
            <Card title="Thanks" className="footerCard" variant="borderless">
              We would like to thanks:
              <Space orientation="vertical">{thanks}</Space>
              Without you this software would not have been possible.
            </Card>
            <Card title="Navigate" className="footerCard" variant="borderless">
              <Space orientation="vertical">{navigate}</Space>
            </Card>
            <Card title="Contact" className="footerCard" variant="borderless">
              <Space orientation="vertical">
                <div>
                  <Link href="mailto:contact@2ltech.fr">
                    <Button type="text">
                      <strong>contact@2ltech.fr</strong>
                    </Button>
                  </Link>
                  <br />
                  <Typography.Text>for commercial inquiries</Typography.Text>
                </div>

                <div>
                  <Link
                    href="https://github.com/2LTech/tanatloc/issues"
                    target="_blank"
                  >
                    <Button type="text">
                      <strong>Github Issues</strong>
                    </Button>
                  </Link>
                  <br />
                  <Typography.Text>for support questions</Typography.Text>
                </div>
              </Space>
            </Card>
          </div>
          <Divider className="footerDivider" />
        </>
      ) : null}
      <div className="footerFoot">
        <Link href="/">
          <Image src="/img/logo.png" width={2831} height={371} alt="Tanatloc" />
        </Link>
        <Typography.Text>
          Copyright© {new Date().getFullYear()}{' '}
          <Link href="https://2ltech.fr/" target="_blank" className="textDark">
            2LTech
          </Link>{' '}
          - version {packageJson.version} - Design by{' '}
          <Link
            href="https://www.commeth.com/"
            target="_blank"
            className="textDark"
          >
            Commeth
          </Link>
        </Typography.Text>
      </div>
    </Layout.Footer>
  )
}

export default Footer
