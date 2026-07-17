import './index.css'

// Props
export interface IProps {
  left: React.ReactNode
  right: React.ReactNode
  top?: React.ReactNode
  sideStyle?: React.CSSProperties
  sideClassName?: string
  leftStyle?: React.CSSProperties
  leftClassName?: string
  rightStyle?: React.CSSProperties
  rightClassName?: string
  topStyle?: React.CSSProperties
  topClassName?: string
  id?: string
}

/**
 * Side
 * @param props Props
 * @returns Side
 */
const Side: React.FunctionComponent<IProps> = ({
  left,
  right,
  top,
  sideStyle,
  sideClassName,
  leftStyle,
  leftClassName,
  rightStyle,
  rightClassName,
  topStyle,
  topClassName,
  id
}) => {
  /**
   * Render
   */

  return (
    <div className={`side ${sideClassName ?? ''}`} style={sideStyle} id={id}>
      <div className={`sideLeft ${leftClassName ?? ''}`} style={leftStyle}>
        {left}
      </div>
      <div className={`sideRight ${rightClassName ?? ''}`} style={rightStyle}>
        {right}
      </div>
      {top && (
        <div className={`sideTop ${topClassName ?? ''}`} style={topStyle}>
          {top}
        </div>
      )}
    </div>
  )
}

export default Side
