import { useCallback, useMemo, useState } from 'react'
import { Spin, Typography } from 'antd'

// CHANGELOG URL
const changelogURL =
  'https://raw.githubusercontent.com/Airthium/tanatloc/master/CHANGELOG.md'

/**
 * Changelog
 * @returns Changelog
 */
const Changelog: React.FunctionComponent = () => {
  // State
  const [content, setContent] = useState<string>()

  const load = useCallback(async () => {
    try {
      const res = await fetch(changelogURL)
      const changelog = await res.text()
      setContent(changelog)
    } catch (err: unknown) {
      setContent(
        'Unable to fetch CHANGELOG at ' +
          changelogURL +
          '\n' +
          (err instanceof Error ? err.message : String(err))
      )
    }
  }, [])

  // Load
  useMemo(() => {
    load()
  }, [load])

  /**
   * Render
   */
  if (!content) return <Spin />
  return (
    <>
      <Typography.Title level={3}>CHANGELOG</Typography.Title>
      <Typography.Paragraph>
        <blockquote>
          <pre>{content}</pre>
        </blockquote>
      </Typography.Paragraph>
    </>
  )
}

export default Changelog
