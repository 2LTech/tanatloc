import { Typography } from 'antd'

import Carousel from '@/components/assets/carousel'

import '../../index.css'

/**
 * Help
 * @returns Help
 */
const Help: React.FunctionComponent = () => {
  /**
   * Render
   */
  return (
    <>
      <Typography.Title level={4}>Help</Typography.Title>

      <Typography className="docText">
        <Typography.Text>
          You will find the link to this documentation, and to Github Issues
        </Typography.Text>
      </Typography>
      <Carousel
        items={[
          {
            key: 'help',
            src: '/img/doc/help.jpg',
            caption: 'Help'
          }
        ]}
      />
    </>
  )
}

export default Help
