import type { BufferGeometry, Mesh, MeshBasicMaterial } from 'three'
import { useEffect, useMemo } from 'react'
import { LineBasicMaterial, WireframeGeometry } from 'three'

import type { GLTF } from 'three/addons/loaders/GLTFLoader.js'

import useStore from '@store'

/**
 * Props
 */
export interface ResultProps {
  scene: GLTF['scene']
}

export interface ResultChildProps {
  child: Mesh<BufferGeometry, MeshBasicMaterial>
}

/**
 * Get the value range of a result child's scalar `data` attribute.
 *
 * The returned `{ min, max }` is fed into the global LUT aggregation in
 * `helpers/computeLut`, which combines every child with `Math.min` / `Math.max`.
 * `{ min: Infinity, max: -Infinity }` is therefore an intentional "empty range"
 * sentinel — the identity elements of those reductions — meaning "this child
 * contributes nothing to the colour scale". It is NOT an inverted/bugged range.
 *
 * It is returned in two cases:
 * - a `color` attribute already exists: the child carries baked-in vertex
 *   colours (precomputed, or set by a previous `computeLut` pass), so its raw
 *   `data` must not re-drive or distort the shared LUT range;
 * - no `data` attribute exists: there is no scalar field to measure.
 *
 * @param child Result child mesh
 * @returns Value range `{ min, max }`; `{ Infinity, -Infinity }` when the child
 *   has no contributing scalar data (see above)
 */
export const getMinMax = (
  child: Mesh<BufferGeometry, MeshBasicMaterial>
): { min: number; max: number } => {
  const colorAttribute = child.geometry.getAttribute('color')
  if (colorAttribute) return { min: Infinity, max: -Infinity }

  const data = child.geometry.getAttribute('data')
  if (!data) return { min: Infinity, max: -Infinity }
  const array = data.array as unknown as number[]
  let min = array.reduce((a, b) => Math.min(a, b), Infinity)
  let max = array.reduce((a, b) => Math.max(a, b), -Infinity)

  // Constant field (min === max): widen to a visible range so the LUT and
  // colour bar have non-zero width.
  if (min === max) {
    if (Math.abs(min) < 1e-12) {
      // (Near-)zero value: no meaningful scale, use a symmetric unit range.
      min = -1
      max = 1
    } else {
      // Pad by ±10% of the magnitude.
      const delta = Math.abs(min) * 0.1
      min = min - delta
      max = max + delta
    }
  }

  return { min, max }
}

/**
 * Result child
 * @param props props
 * @returns ResultChild
 */
const ResultChild: React.FunctionComponent<ResultChildProps> = ({ child }) => {
  // Store
  const display = useStore((s) => s.display)
  const sectionView = useStore((s) => s.sectionView)
  const result = useStore((s) => s.result)

  // Min / max & data
  const { min, max } = useMemo(() => getMinMax(child), [child])
  const data = useMemo(() => {
    const data = child.geometry.getAttribute('data')
    if (!data) return {}
    return {
      count: data.count,
      array: data.array as unknown as number[]
    }
  }, [child])

  // Result mesh
  const { mesh, geometry, material } = useMemo(() => {
    if (!result.meshVisible || child.type !== 'Mesh')
      return { resultMesh: undefined }

    const geometry = new WireframeGeometry(child.geometry)
    const material = new LineBasicMaterial({
      linewidth: 2,
      transparent: true,
      color: 0x000000,
      opacity: display.transparent ? 0.5 : 1,
      clippingPlanes:
        sectionView.enabled && sectionView.clippingPlane
          ? [sectionView.clippingPlane]
          : []
    })
    const mesh = <lineSegments args={[geometry, material]} />
    return { mesh, geometry, material }
  }, [
    display.transparent,
    sectionView.enabled,
    sectionView.clippingPlane,
    result.meshVisible,
    child
  ])

  // Dispose the locally-created wireframe geometry & material
  useEffect(() => {
    return () => {
      geometry?.dispose()
      material?.dispose()
    }
  }, [geometry, material])

  /**
   * Render
   */
  return (
    <mesh
      name={child.name}
      type="Result"
      uuid={child.userData.uuid}
      userData={{
        ...child.userData,
        lut: {
          min,
          max
        },
        data
      }}
    >
      <primitive object={child.geometry} />
      <meshBasicMaterial
        vertexColors
        side={2}
        transparent
        opacity={display.transparent ? 0.5 : 1}
        clippingPlanes={
          sectionView.enabled && sectionView.clippingPlane
            ? [sectionView.clippingPlane]
            : []
        }
      />
      {mesh}
    </mesh>
  )
}

/**
 * Result
 * @param props Props
 * @returns Result
 */
const Result: React.FunctionComponent<ResultProps> = ({ scene }) => {
  // Child
  const children = useMemo(
    () => scene.children as Mesh<BufferGeometry, MeshBasicMaterial>[],
    [scene.children]
  )

  /**
   * Render
   */
  return children.map((child) => <ResultChild key={child.uuid} child={child} />)
}

export default Result
