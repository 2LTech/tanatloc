import { render } from '@testing-library/react'

import type { Tanatloc3DPart } from '@index'

import PartLoader from '.'

const mockUseStore = jest.fn()
jest.mock('@store', () => {
  const useStore = (callback: (...args: any) => void) => mockUseStore(callback)
  return useStore
})

const mockGLTFLoad = jest.fn()
jest.mock('three/addons/loaders/GLTFLoader.js', () => {
  class GLTFLoader {
    load(
      _url: string,
      callback: (...args: any) => void,
      progress: (...args: any) => void,
      error: (...args: any) => void
    ) {
      callback(mockGLTFLoad())
      progress({ loaded: 10, total: 100 })
      error('error')
    }
  }
  return { GLTFLoader }
})

jest.mock('@tools/zoomToFit', () => () => undefined)

jest.mock('./geometry2D', () => {
  const Elem = () => <mesh />
  return Elem
})
jest.mock('./geometry3D', () => () => {
  const Elem = () => <mesh />
  return Elem
})
jest.mock('./mesh', () => () => {
  const Elem = () => <mesh />
  return Elem
})
jest.mock('./result', () => () => {
  const Elem = () => <mesh />
  return Elem
})

globalThis.URL.createObjectURL = jest.fn()

describe('loader', () => {
  const part = {
    summary: { uuid: 'uuid' },
    buffer: 'buffer'
  } as unknown as Tanatloc3DPart

  const mainView = {
    scene: { children: [{}] },
    camera: {},
    controls: {}
  }

  beforeEach(() => {
    mockUseStore.mockImplementation((callback) => {
      callback({})
      return {}
    })

    mockGLTFLoad.mockReset()
    mockGLTFLoad.mockImplementation(() => ({ scene: { userData: {} } }))
  })

  test('render', () => {
    const { unmount } = render(<PartLoader part={part} uuid="uuid" />)

    unmount()
  })

  test('with store', () => {
    mockUseStore.mockImplementation(() => mainView)
    const { unmount } = render(<PartLoader part={part} uuid="uuid" />)

    unmount()
  })
})
