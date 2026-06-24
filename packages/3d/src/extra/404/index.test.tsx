import ReactThreeTestRenderer from '@react-three/test-renderer'

import NotFound, { NotFoundRender } from '.'

const mockSetState = jest.fn()
jest.mock('@store', () => ({
  setState: (state: any) => mockSetState(state)
}))

describe('extra/404', () => {
  test('NotFound', async () => {
    const renderer = await ReactThreeTestRenderer.create(<NotFound />)

    expect(mockSetState).toHaveBeenCalledWith({ extra: { notFound: true } })

    await renderer.unmount()

    expect(mockSetState).toHaveBeenCalledWith({ extra: {} })
  })

  test('NotFoundRender', async () => {
    const renderer = await ReactThreeTestRenderer.create(<NotFoundRender />)

    await renderer.unmount()
  })
})
