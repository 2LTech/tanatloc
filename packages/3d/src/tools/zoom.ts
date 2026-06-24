import type { PerspectiveCamera, Vector3 } from 'three'
import type { TrackballControlsProps } from '@react-three/drei'

/**
 * Zoom factor
 */
const zoomFactor = 0.01

/**
 * Zoom
 * @param camera Camera
 * @param controls Controls
 * @param direction Direction
 */
const zoom = (
  camera: PerspectiveCamera | undefined,
  controls: TrackballControlsProps | undefined,
  direction: 1 | -1
): void => {
  if (!camera || !controls) return
  const object = controls.object as PerspectiveCamera
  const target = controls.target as Vector3
  const targetDistance = object.position.distanceTo(target)
  const zoomDistance = targetDistance * direction * zoomFactor
  const translation = target
    .clone()
    .sub(camera.position)
    .normalize()
    .multiplyScalar(zoomDistance)

  camera.position.add(translation)
}

export default zoom
