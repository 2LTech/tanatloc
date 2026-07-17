import { Button, Tooltip } from 'antd'
import { EditOutlined } from '@ant-design/icons'

/**
 * Props
 */
export interface IProps {
  disabled?: boolean
  primary?: boolean
  bordered?: boolean
  light?: boolean
  dark?: boolean
  needMargin?: boolean
  children?: React.ReactNode
}

/**
 * Edit button
 * @param props Props
 * @returns EditButton
 */
const EditButton: React.FunctionComponent<IProps> = ({
  disabled,
  primary = false,
  bordered,
  light,
  dark,
  needMargin,
  children
}) => {
  let type: 'link' | 'primary' | 'default'
  if (disabled) type = 'link'
  else if (primary) type = 'primary'
  else type = 'default'

  /**
   * Render
   */
  return (
    <Tooltip title={children ?? 'Edit'}>
      <Button
        className={`${type == 'primary' ? '' : 'noBackground'} ${
          light ? 'textLight' : ''
        } ${dark ? 'textDark' : ''} ${bordered ? '' : 'noBorder'}`}
        style={needMargin ? { marginLeft: '5px' } : {}}
        disabled={disabled}
        type={type}
        icon={<EditOutlined />}
      >
        {children}
      </Button>
    </Tooltip>
  )
}

export default EditButton
