import { render, waitFor } from '@testing-library/react'

import type { Tanatloc3DPart } from '@index'

const mockUseStore = jest.fn()
jest.mock('@store', () => {
  const useStore = (callback: (...args: any) => void) => mockUseStore(callback)
  return useStore
})

jest.mock('three/addons/loaders/GLTFLoader.js', () => {
  class GLTFLoader {
    load(
      _url: string,
      callback: (...args: any) => void,
      progress: (...args: any) => void,
      error: (...args: any) => void
    ) {
      callback({
        scene: { userData: { type: 'other' } }
      })
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
jest.mock('./geometry3D', () => {
  const Elem = () => <mesh />
  return Elem
})
jest.mock('./mesh', () => {
  const Elem = () => <mesh />
  return Elem
})
jest.mock('./result', () => {
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
      return mainView
    })
  })

  test('Geometry2D', async () => {
    const PartLoader = (await import('.')).default

    const { container, unmount } = render(
      <PartLoader part={part} uuid="uuid" />
    )

    await waitFor(() => container.querySelector('mesh'))

    unmount()
  })
})
