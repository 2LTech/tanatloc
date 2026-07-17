import { Typography } from 'antd'

import Carousel from '@/components/assets/carousel'

import '../../index.css'

/**
 * Account
 * @returns Account
 */
const Account: React.FunctionComponent = () => {
  /**
   * Render
   */
  return (
    <>
      <Typography.Title level={4}>Account Settings</Typography.Title>

      <Typography className="docText">
        <Typography.Text>
          Account settings allow you to:
          <ul>
            <li>modify your email, first name, last name, avatar</li>
            <li>delete your account</li>
            <li>modify your password</li>
            <li>manage your HPC providers</li>
          </ul>
        </Typography.Text>
      </Typography>
      <Carousel
        items={[
          {
            key: 'personal',
            src: '/img/doc/account_personal.jpg',
            caption: 'Personal Information'
          },
          {
            key: 'security',
            src: '/img/doc/account_security.jpg',
            caption: 'Security'
          },
          {
            key: 'hpc',
            src: '/img/doc/account_hpc.jpg',
            caption: 'HPC Providers'
          }
        ]}
      />

      <Typography className="docText">
        <Typography.Text className="docWarnings">
          Deleting your account is not reversible. If you delete your account,
          all data will be lost
        </Typography.Text>
      </Typography>
    </>
  )
}

export default Account
