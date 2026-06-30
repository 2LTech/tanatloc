import type { Mesh } from 'three'
import { useRef } from 'react'
import { Vector3 } from 'three'
import { ReactThreeFiber, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'

/**
 * Props
 */
export interface StaticTextProps {
  position?: Vector3
  fontSize?: number
  color?: ReactThreeFiber.Color
  children?: string
}

/**
 * Static text
 * @param props props
 * @returns StaticText
 */
const StaticText: React.FunctionComponent<StaticTextProps> = ({
  position = new Vector3(0, 0, 0),
  fontSize,
  color,
  children = ''
}: StaticTextProps) => {
  // Ref
  const ref = useRef<Mesh>(null!)

  // Always front of camera
  useFrame(({ camera }) => {
    if (ref.current && camera.quaternion)
      ref.current.quaternion.copy(camera.quaternion)
  })

  /**
   * Render
   */
  return (
    <Text ref={ref} color={color} position={position} fontSize={fontSize}>
      {children}
    </Text>
  )
}

export default StaticText
