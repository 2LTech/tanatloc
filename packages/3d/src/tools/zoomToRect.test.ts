import type { Box2, Mesh, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import type { TrackballControlsProps } from '@react-three/drei'
import { Vector3 } from 'three'

import zoomToRect from './zoomToRect'

const mockIntersectObjects = jest.fn()
jest.mock('three', () => {
  class Raycaster {
    setFromCamera() {
      // Empty
    }
    intersectObjects() {
      return mockIntersectObjects()
    }
  }

  return {
    ...jest.requireActual('three'),
    Raycaster
  }
})

describe('tools/zoomToRect', () => {
  const part = {
    type: 'Part'
  } as Mesh
  const rect = {
    min: { x: 0, y: 0 },
    max: { x: 10, y: 10 }
  } as Box2
  const gl = {
    domElement: {
      getBoundingClientRect: () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 100
      })
    }
  } as WebGLRenderer
  const scene = {
    children: [part]
  } as unknown as Scene
  const camera = {
    position: new Vector3(0, 0, 5)
  } as PerspectiveCamera
  const controls = {
    target: new Vector3(0, 0, 0)
  } as TrackballControlsProps

  beforeEach(() => {
    mockIntersectObjects.mockReset()
    mockIntersectObjects.mockImplementation(() => [
      { point: new Vector3(0, 0, 0), object: { type: 'LineSegments' } },
      { point: new Vector3(0, 0, 0), object: { type: 'Mesh' } }
    ])
  })

  test('run', () => {
    zoomToRect(rect, gl, scene.children, camera, controls)
  })

  test('too small', () => {
    zoomToRect(
      {
        min: { x: 0, y: 0 },
        max: { x: 1, y: 1 }
      } as Box2,
      gl,
      scene.children,
      camera,
      controls
    )
  })

  test('empty scene', () => {
    zoomToRect(rect, gl, [], camera, controls)
  })

  test('empty intersection', () => {
    mockIntersectObjects.mockImplementation(() => [])
    zoomToRect(rect, gl, scene.children, camera, controls)
  })
})
