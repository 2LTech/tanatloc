import type { Mesh, Scene } from 'three'
import { Box3, Vector3 } from 'three'

/**
 * Check bounding box
 * @param box Boundng box
 * @returns True
 * @returns False
 */
const checkBoundingBox = (box: Box3): boolean => {
  const min = box.min
  const max = box.max
  if (
    !Number.isFinite(min.x) ||
    !Number.isFinite(min.y) ||
    !Number.isFinite(min.z) ||
    !Number.isFinite(max.x) ||
    !Number.isFinite(max.y) ||
    !Number.isFinite(max.z)
  )
    return false

  return true
}

/**
 * Compute scene bounding box
 * @param children Scene children
 * @returns Bounding box
 */
const computeSceneBoundingBox = (children: Scene['children']): Box3 => {
  const box = new Box3()

  children.forEach((child) => {
    if (child.type === 'Part') {
      const mesh = child as Mesh
      mesh.geometry.computeBoundingBox()
      box.expandByObject(mesh)
    }
  })

  if (checkBoundingBox(box)) return box
  else return new Box3(new Vector3(0, 0, 0), new Vector3(0, 0, 0))
}

export default computeSceneBoundingBox
