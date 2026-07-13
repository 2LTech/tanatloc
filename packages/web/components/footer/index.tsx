/** @module Components.Footer */

import { useMemo } from 'react'
import Link from 'next/link'
import { Button, Card, Divider, Layout, Space, Typography } from 'antd'

import {
  scrollToAboutUs,
  scrollToBlog,
  scrollToCaseStudy,
  scrollToDevelopers,
  scrollToDoc,
  scrollToFeatures,
  scrollToGetStarted
} from '@/components/tools/scrollTo'

import packageJson from '@/package.json'

import './index.css'

/**
 * Footer
 * @returns Footer
 */
const Footer: React.FunctionComponent = () => {
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
    [
      scrollToFeatures,
      scrollToDevelopers,
      scrollToCaseStudy,
      scrollToGetStarted,
      scrollToAboutUs,
      scrollToBlog,
      scrollToDoc
    ]
  )

  /**
   * Render
   */
  return (
    <Layout.Footer className="footer">
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
              <a href="mailto:contact@airthium.com">
                <Button type="text">
                  <strong>contact@airthium.com</strong>
                </Button>
              </a>
              <br />
              <Typography.Text>for commercial inquiries</Typography.Text>
            </div>

            <div>
              <a
                href="https://github.com/Airthium/tanatloc/issues"
                target="_blank"
                rel="noreferrer"
              >
                <Button type="text">
                  <strong>Github Issues</strong>
                </Button>
              </a>
              <br />
              <Typography.Text>for support questions</Typography.Text>
            </div>
          </Space>
        </Card>
      </div>
      <Divider className="footerDivider" />
      <div className="footerFoot">
        <img src="/images/logo.svg" alt="Tanatloc" />
        <Typography>
          Copyright© {new Date().getFullYear()} - version {packageJson.version}{' '}
          - Design by{' '}
          <a
            href="https://www.commeth.com/"
            target="_blank"
            rel="noreferrer"
            className="textDark"
          >
            Enora Duvivier
          </a>
        </Typography>
      </div>
    </Layout.Footer>
  )
}

export default Footer
