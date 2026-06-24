import { screen, render } from '@testing-library/react'

import Header from '.'

const mockUseStore = jest.fn()
jest.mock('@store', () => {
  const useStore = (callback: (...args: any) => any) => mockUseStore(callback)
  return useStore
})

jest.mock('./snapshot', () => {
  const Elem = () => <div />
  return Elem
})
jest.mock('./unit', () => {
  const Elem = () => <div />
  return Elem
})
jest.mock('./display', () => {
  const Elem = () => <div />
  return Elem
})
jest.mock('./zoom', () => {
  const Elem = () => <div />
  return Elem
})
jest.mock('./sectionView', () => {
  const Elem = () => <div />
  return Elem
})
const colorbarRole = 'colorbar'
jest.mock('./colorbar', () => {
  const Elem = () => <div role={colorbarRole} />
  return Elem
})
jest.mock('./results', () => {
  const Elem = () => <div />
  return Elem
})
jest.mock('./settings', () => {
  const Elem = () => <div />
  return Elem
})

describe('header', () => {
  const oneResult = false

  test('render', () => {
    const { unmount } = render(<Header oneResult={oneResult} />)

    unmount()
  })

  beforeEach(() => {
    mockUseStore.mockImplementation((callback) => {
      callback({})
      return {}
    })
  })

  test('width data & postprocessing', () => {
    mockUseStore.mockImplementation(() => ({
      data: true,
      postProcessing: true
    }))
    const { unmount } = render(<Header oneResult={oneResult} />)

    expect(screen.getByRole('button', { name: 'database' })).toBeDefined()
    expect(screen.getByRole('button', { name: 'filter' })).toBeDefined()

    unmount()
  })

  test('width data', () => {
    mockUseStore.mockImplementation(() => ({
      data: true
    }))
    const { unmount } = render(<Header oneResult={oneResult} />)

    expect(screen.getByRole('button', { name: 'database' })).toBeDefined()

    unmount()
  })

  test('width postprocessing', () => {
    mockUseStore.mockImplementation(() => ({
      postProcessing: true
    }))
    const { unmount } = render(<Header oneResult={oneResult} />)

    expect(screen.getByRole('button', { name: 'filter' })).toBeDefined()

    unmount()
  })

  test('with one result', () => {
    const { unmount } = render(<Header oneResult={true} />)

    expect(screen.getByRole(colorbarRole)).toBeDefined()

    unmount()
  })
})
