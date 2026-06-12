/** @module Components.Account.HPC */

import { useState, useEffect, useContext, useRef, ReactNode } from 'react'
import { Card, Space, Spin } from 'antd'

import { NotificationContext } from '@/context/notification'
import { addError } from '@/context/notification/actions'

import { asyncFunctionExec } from '@/components/utils/asyncFunction'

import PluginsAPI from '@/api/plugins'

import Plugin from './plugin'

import globalStyle from '@/styles/index.module.css'

/**
 * Errors
 */
export const errors = {
  plugins: 'Unable to load plugins'
}

/**
 * Plugins list
 * @returns List
 */
export const _pluginsList = async () => {
  const plugins = await PluginsAPI.list()

  const HPCPlugins = plugins.filter((plugin) => plugin.category === 'HPC')

  if (HPCPlugins.length) {
    return HPCPlugins.map((plugin) => (
      <Card key={plugin.key} title={plugin.name}>
        <Plugin plugin={plugin} />
      </Card>
    ))
  } else {
    return (
      <Card title="No access">
        You do not have access to any HPC plugin. Request it.
      </Card>
    )
  }
}

/**
 * HPC plugins
 * @param props Props
 * @returns HPC
 */
const HPC: React.FunctionComponent = () => {
  // Ref
  const containerRef = useRef<HTMLDivElement>(null)

  // State
  const [list, setList] = useState<ReactNode>([
    <Card key="loading" title="Loading">
      <Spin />
    </Card>
  ])

  // Context
  const { dispatch } = useContext(NotificationContext)

  // Plugins list
  useEffect(() => {
    asyncFunctionExec(async () => {
      try {
        const newList = await _pluginsList()
        setList(newList)
      } catch (err: any) {
        dispatch(
          addError({
            title: errors.plugins,
            err
          })
        )
        setList(
          <Card key="error" title="Error">
            Something leads to an error. Please try again later.
          </Card>
        )
      }
    })
  }, [dispatch])

  // TODO review resize function, must be CSS

  /**
   * Render
   */
  return (
    <Space
      ref={containerRef}
      orientation="vertical"
      className={`${globalStyle.fullWidth} ${globalStyle.scroll}`}
      size={20}
    >
      {list}
    </Space>
  )
}

export default HPC
