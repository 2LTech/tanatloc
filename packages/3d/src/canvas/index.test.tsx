import { fireEvent, render, screen } from '@testing-library/react'

import Canvas from '.'

jest.mock('@react-three/fiber', () => ({
  Canvas: (props: any) => <div>{props.children}</div>
}))

const trackballControlsRole = 'TrackballControls'
jest.mock('@react-three/drei', () => ({
  Hud: (props: any) => <div>{props.children}</div>,
  PerspectiveCamera: () => <div />,
  TrackballControls: (props: any) => (
    <button
      role={trackballControlsRole}
      onClick={props.onChange}
      onKeyUp={console.debug}
    />
  )
}))

const mockIsWebGLAvailable = jest.fn()
jest.mock('three/addons/capabilities/WebGL.js', () => ({
  isWebGL2Available: () => mockIsWebGLAvailable()
}))

const mockUseStore = jest.fn()
jest.mock('@store', () => {
  const useStore = (callback: (...args: any) => any) => mockUseStore(callback)
  return useStore
})
jest.mock('@store/mainStoreFiller', () => {
  const Elem = () => <div />
  return Elem
})

jest.mock('@helpers/frameRate', () => {
  const Elem = () => <div />
  return Elem
})
jest.mock('@helpers/navigation', () => {
  const Elem = () => <div />
  return Elem
})
jest.mock('@helpers/grid', () => {
  const Elem = () => <div />
  return Elem
})
jest.mock('@helpers/zoomToSelection', () => {
  const Elem = () => <div />
  return Elem
})
jest.mock('@helpers/sectionView', () => {
  const Elem = () => <div />
  return Elem
})
jest.mock('@helpers/computeLut', () => {
  const Elem = () => <div />
  return Elem
})
jest.mock('@helpers/colorbar', () => {
  const Elem = () => <div />
  return Elem
})
jest.mock('@helpers/light', () => {
  const Elem = () => <div />
  return Elem
})
jest.mock('@helpers/point', () => {
  const Elem = () => <div />
  return Elem
})

jest.mock('@extra/404', () => ({
  NotFoundRender: () => <div />
}))
jest.mock('@extra/background', () => ({
  BackgroundRender: () => <div />
}))

jest.mock('./parts', () => {
  const Elem = () => <div />
  return Elem
})

describe('Tanatloc3D', () => {
  const props = { parts: [{ summary: { type: 'result' } }] }
  const geometry = {
    dimension: 3
  }

  beforeEach(() => {
    mockIsWebGLAvailable.mockReset()
    mockIsWebGLAvailable.mockImplementation(() => true)

    mockUseStore.mockImplementation((callback) => {
      callback({})
      return {}
    })
  })

  test('render', () => {
    const { unmount } = render(<Canvas />)

    unmount()
  })

  test('controls update', () => {
    const { unmount } = render(<Canvas />)

    const trackballControls = screen.getByRole('TrackballControls')
    fireEvent.click(trackballControls)

    unmount()
  })

  test('resize', () => {
    const { unmount } = render(<Canvas />)

    fireEvent.resize(globalThis.window)

    unmount()
  })

  test('oneResult', () => {
    mockUseStore.mockImplementation(() => ({ ...props, ...geometry }))
    const { unmount } = render(<Canvas />)

    unmount()
  })

  test('404', () => {
    mockUseStore.mockImplementation(() => ({ notFound: true }))
    const { unmount } = render(<Canvas />)

    unmount()
  })

  test('Background', () => {
    mockUseStore.mockImplementation(() => ({ background: true }))
    const { unmount } = render(<Canvas />)

    unmount()
  })

  test('no WebGL', () => {
    mockIsWebGLAvailable.mockImplementation(() => false)
    const { unmount } = render(<Canvas />)

    unmount()
  })

  test('no WebGL, with props', () => {
    mockIsWebGLAvailable.mockImplementation(() => false)
    const { unmount } = render(<Canvas toWebGL={console.debug} />)

    unmount()
  })
})
