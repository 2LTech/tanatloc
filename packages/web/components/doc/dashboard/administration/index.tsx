import { Typography } from 'antd'

import Carousel from '@/components/assets/carousel'
import {
  AddButton,
  DeleteButton,
  EditButton
} from '@/components/assets/fakeButton'

import '../../index.css'

/**
 * Administration
 * @returns Administration
 */
const Administration: React.FunctionComponent = () => {
  /**
   * Render
   */
  return (
    <>
      <Typography.Title level={4}>Administration</Typography.Title>
      <Typography className="docText">
        You need to be an administrator to have access to this part
      </Typography>

      <Typography className="docText">
        <Typography.Title level={4}>Users management</Typography.Title>
        <Typography.Text>
          The first tab of Administration is the users management
        </Typography.Text>
        <Typography.Text>
          You can add a user using <AddButton>New user</AddButton>. You have to
          provide an email and a password, and optionally a first name, a last
          name, some plugins authorization and the administrator status
        </Typography.Text>
        <Typography.Text>
          You can edit a user using <EditButton bordered>Edit</EditButton>
        </Typography.Text>
        <Typography.Text>
          You can delete a user using <DeleteButton bordered />
        </Typography.Text>
      </Typography>
      <Carousel
        items={[
          {
            key: 'user',
            src: '/img/doc/administration_user.jpg',
            caption: 'Users'
          },
          {
            key: 'add',
            src: '/img/doc/administration_user_add.jpg',
            caption: 'Add user'
          },
          {
            key: 'edit',
            src: '/img/doc/administration_user_edit.jpg',
            caption: 'Edit user'
          }
        ]}
      />

      <Typography className="docText">
        <Typography.Title level={4}>Registration</Typography.Title>
        <Typography.Text>
          You can manage registration parameters in the Registration tab
        </Typography.Text>
        <ul>
          <li>Allow registration</li>
          <li>Require a minimal and maximal password length</li>
          <li>Require letters, numbers or/and symbols in the password</li>
        </ul>
      </Typography>
      <Carousel
        items={[
          {
            key: 'registration',
            src: '/img/doc/administration_registration.jpg',
            caption: 'Registration'
          }
        ]}
      />

      <Typography className="docText">
        <Typography.Title level={4}>Plugins</Typography.Title>
        <Typography.Text>
          The plugins tab allows you to manage default enabled plugins at user
          creation
        </Typography.Text>
        <Typography.Text>
          If a plugin is checked, it will be available directly when a user is
          created
        </Typography.Text>
      </Typography>
      <Carousel
        items={[
          {
            key: 'plugins',
            src: '/img/doc/administration_plugins.jpg',
            caption: 'Plugins'
          }
        ]}
      />
    </>
  )
}

export default Administration
