/** @module Components.WebGL */
'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

import Tanatloc3D from '@tanatloc/3d'

import globalStyle from '@/styles/index.module.css'

/**
 * Errors
 */
export const errors = {
  webGL: 'WebGL is not enabled on your device. Please enable it.'
}

/**
 * WebGL error
 * @returns WebGLError
 */
const WebGLError: React.FunctionComponent = () => {
  // Data
  const router = useRouter()

  /**
   * Back
   */
  const back = useCallback((): void => router.back(), [router])

  /**
   * Render
   */
  return (
    <Tanatloc3D.Extra.WebGL
      logo={
        <div className={globalStyle.logo}>
          <img src="/images/logo.svg" alt="Tanatloc" />
        </div>
      }
      back={back}
    />
  )
}

export default WebGLError
