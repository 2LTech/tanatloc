'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Tanatloc3D from '@tanatloc/3d'

/**
 * Interface
 */
export interface Props {
  children: React.ReactNode
}

/**
 * With three.js
 * @param props Props
 * @returns With three.js
 */
const WithThree: React.FunctionComponent<Props> = ({ children }) => {
  // Router
  const router = useRouter()

  /**
   * To WebGL
   */
  const toWebGL = useCallback(() => {
    router.push('/webgl')
  }, [router])

  /**
   * Render
   */
  return (
    <>
      <Tanatloc3D.Canvas toWebGL={toWebGL} />
      {children}
    </>
  )
}

export default WithThree
