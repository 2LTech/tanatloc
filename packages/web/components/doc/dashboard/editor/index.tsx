import Link from 'next/link'
import { Typography } from 'antd'

import '../../index.css'

const Editor: React.FunctionComponent = () => {
  return (
    <>
      <Typography.Title level={4}>Model Editor</Typography.Title>

      <Typography className="docText">
        <Typography.Text className="docWarnings">
          This is a beta version
        </Typography.Text>
        <Typography.Text>
          <Link href="/doc?section=editor">Model Editor documentation</Link>
        </Typography.Text>
      </Typography>
    </>
  )
}

export default Editor
