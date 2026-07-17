import { Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

/**
 * Props
 */
export interface IProps {
  children?: React.ReactNode
  className?: string
  onClick: () => void
}

/**
 * Go back
 * @param props Props
 * @returns GoBack
 */
const GoBack: React.FunctionComponent<IProps> = ({
  children,
  className,
  onClick
}) => {
  /**
   * Render
   */
  return (
    <Button
      className={`noBorder  ${className}`}
      icon={<ArrowLeftOutlined className="primaryColor" />}
      onClick={onClick}
    >
      {children ?? 'Go back'}
    </Button>
  )
}

export default GoBack
