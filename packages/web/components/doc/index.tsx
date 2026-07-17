'use client'

import Link from 'next/link'
import {
  ReactNode,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Layout, Menu, Typography } from 'antd'

import packageJson from '@/package.json'

import { getGitVersion } from '@/components/tools/getGitVersion'
import { createQueryString } from '@/components/tools/createQueryString'

import Header from '@/components/assets/header'
import Footer from '@/components/assets/footer'
import Image from '@/components/assets/image'

import Installation from './installation'
import Changelog from './changelog'
import Workflow from './workflow'
import Dashboard from './dashboard'
import Project from './project'
import Editor from './editor'
import Plugins from './plugins'

import './index.css'

/**
 * Doc
 * @returns Doc
 */
const Doc: React.FunctionComponent = () => {
  // Ref
  const navRef = useRef<{ section: string | null; tab: string | null }>({
    section: null,
    tab: null
  })

  // State
  const [content, setContent] = useState<ReactNode>()

  // Data
  const router = useRouter()
  const searchParams = useSearchParams()
  const section = searchParams.get('section')
  const tab = searchParams.get('tab')

  /**
   * On router
   * @param route Route
   */
  const onRouter = useCallback(
    (route: {
      pathname: string
      query?: { section: string; tab?: string | null }
    }): void => {
      let newRoute = route.pathname
      if (route.query) {
        newRoute += '?'

        const queries = [{ name: 'section', value: route.query.section }]
        if (route.query.tab)
          queries.push({ name: 'tab', value: route.query.tab })
        newRoute += createQueryString(searchParams, queries)
      }
      router.push(newRoute)
    },
    [router, searchParams]
  )

  /**
   * On menu click
   * @param param { keyPath }
   */
  const onMenuClick = useCallback(
    ({ keyPath }: { keyPath: (string | null)[] }): void => {
      let key = keyPath.pop()
      if (key === 'rc-menu-more') key = keyPath.pop()
      const subKey = keyPath.pop()

      switch (key) {
        case 'installation':
          onRouter({
            pathname: '/doc',
            query: {
              section: 'installation',
              tab: subKey
            }
          })
          setContent(<Installation />)
          break
        case 'changelog':
          onRouter({
            pathname: '/doc',
            query: {
              section: 'changelog'
            }
          })
          setContent(<Changelog />)
          break
        case 'workflow':
          onRouter({
            pathname: '/doc',
            query: {
              section: 'workflow'
            }
          })
          setContent(<Workflow />)
          break
        case 'dashboard':
          onRouter({
            pathname: '/doc',
            query: {
              section: 'dashboard',
              tab: subKey
            }
          })
          setContent(<Dashboard />)
          break
        case 'project':
          onRouter({
            pathname: '/doc',
            query: {
              section: 'project',
              tab: subKey
            }
          })
          setContent(<Project />)
          break
        case 'modelEditor':
          onRouter({
            pathname: '/doc',
            query: {
              section: 'modelEditor',
              tab: subKey
            }
          })
          setContent(<Editor />)
          break
        case 'plugins':
          onRouter({
            pathname: '/doc',
            query: {
              section: 'plugins',
              tab: subKey
            }
          })
          setContent(<Plugins />)
          break
        default:
          onRouter({
            pathname: '/doc'
          })
          setContent(undefined)
          break
      }
    },
    [onRouter]
  )

  // Init
  useEffect(() => {
    if (section !== navRef.current?.section || tab !== navRef.current?.tab) {
      navRef.current = {
        section,
        tab
      }
      onMenuClick({ keyPath: [tab, section] })
    }
  }, [section, tab, onMenuClick])

  // Menu items
  const menuItems = useMemo(
    () => [
      {
        key: 'introduction',
        label: 'Introduction'
      },
      {
        key: 'installation',
        label: 'Installation',
        onTitleClick: () => onMenuClick({ keyPath: ['installation'] }),
        children: [
          {
            key: 'desktop',
            label: 'Desktop Application'
          },
          {
            key: 'server',
            label: 'Server'
          }
        ]
      },
      {
        key: 'changelog',
        label: 'CHANGELOG'
      },
      {
        key: 'workflow',
        label: 'Workflow'
      },
      {
        key: 'dashboard',
        label: 'Dashboard usage',
        onTitleClick: () => onMenuClick({ keyPath: ['dashboard'] }),
        children: [
          {
            key: 'workspaces',
            label: 'Workspaces & Projects'
          },
          {
            key: 'account',
            label: 'Account Settings'
          },
          {
            key: 'organizations',
            label: 'Organizations'
          },
          {
            key: 'administration',
            label: 'Administration'
          },
          {
            key: 'editor',
            label: 'Model Editor'
          },
          {
            key: 'help',
            label: 'Help'
          }
        ]
      },
      {
        key: 'project',
        label: 'Project usage',
        onTitleClick: () => onMenuClick({ keyPath: ['project'] }),
        children: [
          {
            key: 'geometry',
            label: 'Geometry'
          },
          {
            key: 'simulation',
            label: 'Simulation'
          },
          {
            key: 'view',
            label: 'View tools'
          }
        ]
      },
      {
        key: 'modelEditor',
        label: 'Model Editor'
      },
      {
        key: 'plugins',
        label: 'Plugins',
        onTitleClick: () => onMenuClick({ keyPath: ['plugins'] }),
        children: [
          {
            key: 'hpc',
            label: 'HPC plugins'
          },
          {
            key: 'model',
            label: 'Model plugins'
          }
        ]
      }
    ],
    [onMenuClick]
  )

  /**
   * Render
   */
  return (
    <Layout className="layout">
      <Header type="doc" />
      <Layout>
        <Layout.Header className="docMenu">
          <Typography.Text className="docWarnings">
            The current documentation is for Tanatloc v1, an updated
            documentation will be available soon.
          </Typography.Text>

          <Menu
            mode="horizontal"
            selectedKeys={[section ?? 'introduction']}
            onClick={onMenuClick}
            items={menuItems}
          />
        </Layout.Header>
        <Layout.Content className="padding50LR">
          {content ?? (
            <>
              <div className="docLogo">
                <Image
                  src="/img/logo.png"
                  alt="Tanatloc"
                  width={165}
                  height={21}
                />
                <Typography.Title level={3}>
                  See the world the way it really is!
                </Typography.Title>
              </div>

              <Typography className="docText">
                <Typography.Text>
                  Tanatloc is a graphical interface for{' '}
                  <Link href="https://freefem.org/" target="_blank">
                    FreeFEM
                  </Link>
                  , a powerful PDE solver.
                </Typography.Text>
                <Typography.Text>
                  Run your numerical simulations locally using the provided
                  physics models (linear elasticity, Navier-Stokes, and more) or
                  write your own using the{' '}
                  <Link href="https://freefem.org/" target="_blank">
                    FreeFEM language
                  </Link>
                  !
                </Typography.Text>
              </Typography>

              <Typography className="docText">
                <Typography.Text>
                  Tanatloc is an open-source project by{' '}
                  <Link href="https://2ltech.fr/" target="_blank">
                    2LTech
                  </Link>
                  , previously{' '}
                  <Link href="https://airthium.com" target="_blank">
                    Airthium
                  </Link>
                  , a deeptech startup working on decarbonizing the planet{' '}
                  <Image
                    src="/img/doc/earth.png"
                    width={64}
                    height={64}
                    alt=""
                  />
                  .
                </Typography.Text>
              </Typography>

              <Typography className="docText">
                <Typography.Title level={3}>
                  Local app - Electron
                </Typography.Title>
                <Typography.Text>
                  You can run Tanatloc locally using the Electron app, download
                  the latest release from the{' '}
                  <Link
                    href="https://github.com/Airthium/tanatloc-electron"
                    target="_blank"
                    rel="noreferrer"
                  >
                    tanatloc-electron repository
                  </Link>
                  .
                </Typography.Text>
                <Typography.Text>
                  See{' '}
                  <Link href="/doc?section=installation&tab=desktop">
                    Installation
                  </Link>
                  .
                </Typography.Text>
              </Typography>

              <Typography className="docText">
                <Typography.Title level={3}>
                  Server deployment - Docker
                </Typography.Title>
                <Typography.Text>
                  If you want to run Tanatloc on a server, you can use the{' '}
                  <Link
                    href="https://github.com/Airthium/tanatloc-deploy#readme"
                    target="_blank"
                  >
                    tanatloc-deploy script
                  </Link>
                  .
                </Typography.Text>
                <Typography.Text>
                  The Tanatloc-deploy script uses the{' '}
                  <Link
                    href="https://github.com/Airthium/tanatloc-docker#readme"
                    target="_blank"
                  >
                    tanatloc-docker repository
                  </Link>
                  .
                </Typography.Text>
                <Typography.Text>
                  See{' '}
                  <Link href="/doc?section=installation&tab=server">
                    Installation
                  </Link>
                  .
                </Typography.Text>
              </Typography>

              <Typography className="docText">
                <Typography.Title level={3}>
                  Bug report / Feature request
                </Typography.Title>
                <Typography.Text>
                  <Link
                    href="https://github.com/Airthium/tanatloc/issues/new/choose"
                    target="_blank"
                  >
                    Open an issue
                  </Link>{' '}
                  on Github.
                </Typography.Text>
              </Typography>

              <Typography className="docText">
                <Typography.Title level={3}>About</Typography.Title>
                <Typography.Text>
                  Version:{' '}
                  <Typography.Text code>{packageJson.version}</Typography.Text>
                </Typography.Text>
                <Typography.Text>
                  Git version:{' '}
                  <Typography.Text code>{getGitVersion()}</Typography.Text>
                </Typography.Text>
              </Typography>

              <Typography className="docText">
                <Typography.Title level={3}>Development</Typography.Title>
                <Typography.Text>
                  See{' '}
                  <Link
                    href="https://github.com/Airthium/tanatloc/blob/master/.github/CONTRIBUTING.md"
                    target="_blank"
                  >
                    CONTRIBUTING.md
                  </Link>
                  .
                </Typography.Text>
                <Typography.Text>
                  <Link
                    href="https://airthium.github.io/tanatloc-doc/"
                    target="_blank"
                  >
                    Developer documentation
                  </Link>
                </Typography.Text>
              </Typography>
            </>
          )}
        </Layout.Content>
      </Layout>
      <Footer type="doc" />
    </Layout>
  )
}

const DocWithSearchParams = () => (
  <Suspense>
    <Doc />
  </Suspense>
)

export default DocWithSearchParams
