import { fireEvent, render, screen } from '@testing-library/react'

import WebGL from '.'

jest.mock('./info/noManipBrowser', () => {
  const Elem = () => <div />
  return Elem
})
jest.mock('./info/firefoxWindows', () => {
  const Elem = () => <div />
  return Elem
})
jest.mock('./info/firefoxMac', () => {
  const Elem = () => <div />
  return Elem
})
jest.mock('./info/safariMac', () => {
  const Elem = () => <div />
  return Elem
})

describe('components/webgl', () => {
  test('render', () => {
    const { unmount } = render(<WebGL />)

    unmount()
  })

  test('back', () => {
    const { unmount } = render(<WebGL />)

    const button = screen.getByRole('button', {
      name: 'Return to the previous page'
    })
    fireEvent.click(button)

    unmount()
  })

  test('modals', () => {
    const { unmount } = render(<WebGL />)

    const buttons = screen.getAllByRole('button')
    buttons.forEach((button) => fireEvent.click(button))

    unmount()
  })
})
