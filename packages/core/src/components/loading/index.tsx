/** @module Components.Loading */

import { ReactNode, useMemo } from 'react'
import Link from 'next/link'
import { Card, Layout, Space, Spin, Steps, Typography } from 'antd'
import { LoadingOutlined, WarningOutlined } from '@ant-design/icons'

import Tanatloc3D from '@tanatloc/3d'

import type { StepsProps } from 'antd'

import globalStyle from '@/styles/index.module.css'
import style from './index.module.css'

// StepItem type
type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never
type StepItem = ArrayElement<NonNullable<StepsProps['items']>>

/**
 * Simple
 * @returns Loading.Simple
 */
const Simple: React.FunctionComponent = () => {
  /**
   * Render
   */
  return (
    <Space
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Card>
        <Space>
          <Spin />
          Loading, please wait...
        </Space>
      </Card>
    </Space>
  )
}

export interface IProps {
  text?: ReactNode
  status?: string[]
  errors?: string[]
}

/**
 * Loading
 * @returns Loading
 */
const Loading: React.FunctionComponent<IProps> & {
  Simple: React.FunctionComponent
} = ({ text, status, errors }) => {
  // Steps
  const steps = useMemo(() => {
    if (!status?.length) return []

    // New step
    const newSteps: (StepItem & { index: number })[] = []
    for (let i = 0; i < status.length; ++i) {
      const desc = status[i]
      if (!desc) continue

      newSteps.push({
        index: i,
        status: 'finish',
        icon: i === 0 ? <LoadingOutlined /> : undefined,
        title: desc
      })
    }

    // Update
    return newSteps
  }, [status])

  // Errors
  const errorMessages = useMemo(() => {
    if (!errors?.length) return []

    return errors.map((err) => {
      let child = null
      if (
        err.includes('docker: command not found') ||
        err.includes('Is the docker daemon running')
      )
        child = (
          <Card className={style.errorCard}>
            There is an error with your Docker installation.
            <br />
            Please verify that Docker is correctly installed and running.
          </Card>
        )
      else if (
        err.includes('EHOSTUNREACH') ||
        err.includes('ENETUNREACH') ||
        err.includes('ETIMEOUT')
      )
        child = (
          <Card className={style.errorCard}>
            There is an error with your PostgreSQL installation.
            <br />
            Please verify that postgres Docker container
            &quot;tanatloc-postgres&quot; is correctly installed and running.
          </Card>
        )

      return (
        <div key={err}>
          {err}
          {child}
        </div>
      )
    })
  }, [errors])

  // Display
  const display = !!status?.length || !!errors?.length

  /**
   * Render
   */
  return (
    <Layout>
      <Tanatloc3D.Extra.Background />
      <div className={globalStyle.logo}>
        <img src="/images/logo.svg" alt="Tanatloc" />
      </div>
      <Card
        className={style.loading}
        styles={{
          body: { padding: 0 }
        }}
        title={
          <div className={style.title}>
            {errors?.length ? (
              <>
                <WarningOutlined className="warning" />
                <Typography.Title level={3} style={{ margin: '0' }}>
                  An error occurs
                </Typography.Title>
                <Link
                  href="https://github.com/Airthium/tanatloc/issues/new/choose"
                  target="_blank"
                >
                  Open an issue
                </Link>
              </>
            ) : (
              <>
                <Spin size="large" indicator={<LoadingOutlined />} />

                {text ?? 'Loading, please wait...'}
              </>
            )}
          </div>
        }
      >
        {display ? (
          <div className={style.content}>
            {errorMessages.length ? (
              <div className={style.errors}>
                {errorMessages.map((err) => err)}
                <Typography.Title level={5}>
                  Please restart the application
                </Typography.Title>
              </div>
            ) : null}
            <div className={style.status}>
              <Steps orientation="vertical" items={steps} />
            </div>
          </div>
        ) : null}
      </Card>
    </Layout>
  )
}

Loading.Simple = Simple
export default Loading
