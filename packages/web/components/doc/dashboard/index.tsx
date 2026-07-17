import { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Tabs, Typography } from 'antd'

import { createQueryString } from '@/components/tools/createQueryString'

import Workspace from './workspace'
import Account from './account'
import Organizations from './organizations'
import Administration from './administration'
import Editor from './editor'
import Help from './help'

import '../index.css'

/**
 * Tabs
 */
const tabs = [
  {
    key: 'workspaces',
    label: 'Workspaces & Projects',
    children: <Workspace />
  },
  {
    key: 'account',
    label: 'Account Settings',
    children: <Account />
  },
  {
    key: 'organizations',
    label: 'Organizations',
    children: <Organizations />
  },
  {
    key: 'administration',
    label: 'Administration',
    children: <Administration />
  },
  {
    key: 'editor',
    label: 'Model Editor',
    children: <Editor />
  },
  {
    key: 'help',
    label: 'Help',
    children: <Help />
  }
]

/**
 * Dashboard
 * @returns Dashboard
 */
const Dashboard: React.FunctionComponent = () => {
  // Data
  const router = useRouter()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')

  /**
   * On change
   * @param key Key
   */
  const onChange = useCallback(
    (key: string): void => {
      router.push(
        '/doc' +
          '?' +
          createQueryString(searchParams, [
            { name: 'section', value: 'dashboard' },
            { name: 'tab', value: key }
          ])
      )
    },
    [router, searchParams]
  )

  /**
   * Render
   */
  return (
    <>
      <Typography.Title level={3}>Dashboard</Typography.Title>
      <Typography className="docText">
        <Typography.Text>
          The dashboard is the main place where you can manage your workspaces
          and projects, your account, your organizations and get help. There is
          an access to the model editor too.
        </Typography.Text>
        <Typography.Text>
          If you are an administrator, you have equally access to administration
          tools.
        </Typography.Text>
      </Typography>

      <Tabs
        className="docTabs"
        activeKey={tab ?? 'workspaces'}
        items={tabs}
        onChange={onChange}
      />
    </>
  )
}

export default Dashboard
