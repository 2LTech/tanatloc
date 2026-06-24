import type { Camera, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { useMemo } from 'react'
import type { TrackballControlsProps } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import useStore from '@store'

/**
 * Props
 */
export interface MainStoreFillerProps {
  controls?: TrackballControlsProps
}

/**
 * Debounce function
 * @param func Function
 * @param timeout Timeout
 * @returns Function
 */
const debounceLeading = (func: (...args: any[]) => void, timeout: number) => {
  let timer: NodeJS.Timeout | undefined
  return (...args: any[]) => {
    if (timer) return

    // Execute function
    func(...args)

    // Set timer
    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = undefined
    }, timeout)
  }
}

/**
 * Main store filler
 * @returns MainStoreFiller
 */
const MainStoreFiller: React.FunctionComponent<MainStoreFillerProps> = ({
  controls
}) => {
  // Update function
  const update = useMemo(
    () =>
      debounceLeading(
        (
          camera: Camera,
          gl: WebGLRenderer,
          scene: Scene,
          controls: TrackballControlsProps
        ) =>
          useStore.setState({
            mainView: {
              gl,
              scene,
              camera: camera as PerspectiveCamera,
              controls
            }
          }),
        500
      ),
    []
  )

  // Update (has to be always up to date)
  useFrame(({ camera, gl, scene }) => {
    update(camera, gl, scene, controls)
  })

  /**
   * Render
   */
  return null
}

export default MainStoreFiller
