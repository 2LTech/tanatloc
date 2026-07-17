import { Button, Tooltip } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

/**
 * Props
 */
export interface IProps {
  disabled?: boolean
  bordered?: boolean
  children?: React.ReactNode
}

/**
 * Delete button
 * @param props Props
 * @returns DeleteButton
 */
const DeleteButton: React.FunctionComponent<IProps> = ({
  disabled,
  bordered,
  children
}) => {
  /**
   * On ok
   */

  /**
   * Render
   */
  return (
    <Tooltip title={children ?? 'Delete'}>
      <Button
        className={`noBackground ${bordered ? '' : 'noBorder'}`}
        danger
        disabled={disabled}
        type={disabled ? 'link' : undefined}
        icon={<DeleteOutlined />}
      >
        {children}
      </Button>
    </Tooltip>
  )
}

export default DeleteButton
