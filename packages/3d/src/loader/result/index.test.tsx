import {
  BoxGeometry,
  BufferGeometry,
  Float32BufferAttribute,
  Mesh,
  MeshBasicMaterial
} from 'three'
import ReactThreeTestRenderer from '@react-three/test-renderer'

import type { GLTF } from 'three/addons/loaders/GLTFLoader.js'

import Result, { getMinMax } from '.'

const mockSetState = jest.fn()
const mockUseStore = jest.fn()
jest.mock('@store', () => {
  const useStore = (callback: (...args: any) => void) => mockUseStore(callback)
  useStore.setState = () => mockSetState()
  return useStore
})

jest.mock('three/addons/math/Lut.js', () => {
  class Lut {
    colormap: string
    min: number
    max: number

    constructor(colormap: string) {
      this.colormap = colormap
      this.min = 0
      this.max = 0
    }
    setMin(min: number) {
      this.min = min
    }
    setMax(max: number) {
      this.max = max
    }
    getColor() {
      return { r: 1, g: 0.5, b: 0 }
    }
  }

  return { Lut }
})

describe('loader/result', () => {
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial()
  const mesh = new Mesh(geometry, material)
  mesh.uuid = 'uuid'
  mesh.name = 'name'
  mesh.userData.uuid = 'uuid1'
  mesh.geometry.setAttribute(
    'color',
    new Float32BufferAttribute([0, 0, 0, 1, 1, 1], 3)
  )

  const scene = {
    children: [mesh]
  } as unknown as GLTF['scene']

  const display = {
    transparent: true
  }
  const sectionView = {
    enabled: true,
    clippingPlane: 'plane'
  }
  const result = {
    meshVisible: true
  }
  const lut = {}

  beforeEach(() => {
    mockSetState.mockReset()

    mockUseStore.mockImplementation((callback) => {
      callback({})
      return {}
    })
  })

  test('render', async () => {
    const renderer = await ReactThreeTestRenderer.create(
      <Result scene={scene} />
    )

    await renderer.unmount()
  })

  test('with store', async () => {
    mockUseStore.mockImplementation(() => ({
      ...display,
      ...sectionView,
      ...result,
      ...lut
    }))
    const renderer = await ReactThreeTestRenderer.create(
      <Result scene={scene} />
    )

    await renderer.unmount()
  })

  test('with store - no transparent - no sectionView', async () => {
    mockUseStore.mockImplementation(() => ({
      ...display,
      transparent: false,
      ...sectionView,
      enabled: false,
      ...result,
      ...lut
    }))
    const renderer = await ReactThreeTestRenderer.create(
      <Result scene={scene} />
    )

    await renderer.unmount()
  })
})

describe('loader/result - without color attributes', () => {
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial()
  const mesh = new Mesh(geometry, material)
  mesh.uuid = 'uuid'
  mesh.name = 'name'
  mesh.userData.uuid = 'uuid1'

  const scene = {
    children: [mesh]
  } as unknown as GLTF['scene']

  beforeEach(() => {
    mockSetState.mockReset()

    mockUseStore.mockImplementation((callback) => {
      callback({})
      return {}
    })
  })

  test('render', async () => {
    const renderer = await ReactThreeTestRenderer.create(
      <Result scene={scene} />
    )

    await renderer.unmount()
  })
})

describe('loader/result - without data attributes', () => {
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial()
  const mesh = new Mesh(geometry, material)
  mesh.uuid = 'uuid'
  mesh.name = 'name'
  mesh.userData.uuid = 'uuid1'

  const scene = {
    children: [mesh]
  } as unknown as GLTF['scene']

  beforeEach(() => {
    mockSetState.mockReset()

    mockUseStore.mockImplementation((callback) => {
      callback({})
      return {}
    })
  })

  test('render', async () => {
    const renderer = await ReactThreeTestRenderer.create(
      <Result scene={scene} />
    )

    await renderer.unmount()
  })
})

describe('loader/result - 0 - 1', () => {
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial()
  const mesh = new Mesh(geometry, material)
  mesh.uuid = 'uuid'
  mesh.name = 'name'
  mesh.userData.uuid = 'uuid1'
  mesh.geometry.setAttribute(
    'data',
    new Float32BufferAttribute([0, 0, 0, 1, 1, 1], 3)
  )

  const scene = {
    children: [mesh]
  } as unknown as GLTF['scene']

  beforeEach(() => {
    mockSetState.mockReset()

    mockUseStore.mockImplementation((callback) => {
      callback({})
      return {}
    })
  })

  test('render', async () => {
    const renderer = await ReactThreeTestRenderer.create(
      <Result scene={scene} />
    )

    await renderer.unmount()
  })
})

describe('loader/result - 0', () => {
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial()
  const mesh = new Mesh(geometry, material)
  mesh.uuid = 'uuid'
  mesh.name = 'name'
  mesh.userData.uuid = 'uuid1'
  mesh.geometry.setAttribute(
    'data',
    new Float32BufferAttribute([0, 0, 0, 0, 0, 0], 3)
  )

  const scene = {
    children: [mesh]
  } as unknown as GLTF['scene']

  beforeEach(() => {
    mockSetState.mockReset()

    mockUseStore.mockImplementation((callback) => {
      callback({})
      return {}
    })
  })

  test('render', async () => {
    const renderer = await ReactThreeTestRenderer.create(
      <Result scene={scene} />
    )

    await renderer.unmount()
  })
})

describe('loader/result - 1', () => {
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial()
  const mesh = new Mesh(geometry, material)
  mesh.uuid = 'uuid'
  mesh.name = 'name'
  mesh.userData.uuid = 'uuid1'
  mesh.geometry.setAttribute(
    'data',
    new Float32BufferAttribute([1, 1, 1, 1, 1, 1], 3)
  )

  const scene = {
    children: [mesh]
  } as unknown as GLTF['scene']

  beforeEach(() => {
    mockSetState.mockReset()

    mockUseStore.mockImplementation((callback) => {
      callback({})
      return {}
    })
  })

  test('render', async () => {
    const renderer = await ReactThreeTestRenderer.create(
      <Result scene={scene} />
    )

    await renderer.unmount()
  })
})

describe('loader/result - getMinMax', () => {
  /**
   * Build a result child mesh carrying the given geometry attributes.
   */
  const makeChild = (attributes: {
    color?: number[]
    data?: number[]
  }): Mesh<BufferGeometry, MeshBasicMaterial> => {
    const geometry = new BufferGeometry()
    if (attributes.color)
      geometry.setAttribute(
        'color',
        new Float32BufferAttribute(attributes.color, 3)
      )
    if (attributes.data)
      geometry.setAttribute(
        'data',
        new Float32BufferAttribute(attributes.data, 1)
      )
    return new Mesh(geometry, new MeshBasicMaterial()) as Mesh<
      BufferGeometry,
      MeshBasicMaterial
    >
  }

  // Sentinel { Infinity, -Infinity } = "no contribution to the LUT range"
  test('color attribute present → empty-range sentinel', () => {
    const child = makeChild({ color: [0, 0, 0, 1, 1, 1], data: [1, 2, 3] })
    // color short-circuits before data is even read
    expect(getMinMax(child)).toEqual({ min: Infinity, max: -Infinity })
  })

  test('no data attribute → empty-range sentinel', () => {
    const child = makeChild({})
    expect(getMinMax(child)).toEqual({ min: Infinity, max: -Infinity })
  })

  test('regular data → actual min / max', () => {
    const child = makeChild({ data: [1, 5, 2, 4, 3] })
    expect(getMinMax(child)).toEqual({ min: 1, max: 5 })
  })

  // min === max and |value| below 1e-12 → fixed [-1, 1] range
  test('constant near-zero data → [-1, 1]', () => {
    const child = makeChild({ data: [0, 0, 0] })
    expect(getMinMax(child)).toEqual({ min: -1, max: 1 })
  })

  // min === max, |value| above the threshold → ±10% padding around the value
  test('constant positive data → ±10% padded range', () => {
    const child = makeChild({ data: [5, 5, 5] })
    const { min, max } = getMinMax(child)
    expect(min).toBeCloseTo(4.5)
    expect(max).toBeCloseTo(5.5)
  })

  // Negative constant must use an absolute delta so that min < max is preserved
  // (a signed 0.1 * max would invert the range to { min: -4.5, max: -5.5 }).
  test('constant negative data → ±10% padded range, min < max', () => {
    const child = makeChild({ data: [-5, -5, -5] })
    const { min, max } = getMinMax(child)
    expect(min).toBeCloseTo(-5.5)
    expect(max).toBeCloseTo(-4.5)
    expect(min).toBeLessThan(max)
  })
})
