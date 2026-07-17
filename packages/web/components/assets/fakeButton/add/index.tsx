import { Button, Tooltip } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'

/**
 * Props
 */
export interface IProps {
  disabled?: boolean
  primary?: boolean
  light?: boolean
  dark?: boolean
  fullWidth?: boolean
  needMargin?: boolean
  children?: React.ReactNode
}

/**
 * Add button
 * @param props Props
 * @returns AddButton
 */
const AddButton: React.FunctionComponent<IProps> = ({
  disabled,
  primary = true,
  light,
  dark,
  fullWidth,
  needMargin,
  children
}) => {
  /**
   * Render
   */
  return (
    <Tooltip title={children ?? 'Add'}>
      <Button
        className={`${fullWidth ? 'fullWidth' : ''} ${
          light ? 'textLight' : ''
        } ${dark ? 'textDark' : ''}`}
        style={needMargin ? { marginLeft: '5px' } : {}}
        disabled={disabled}
        type={primary ? 'primary' : 'default'}
        icon={<PlusCircleOutlined />}
      >
        {children}
      </Button>
    </Tooltip>
  )
}

export default AddButton
