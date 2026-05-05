import Tanatloc3D from '.'

jest.mock('./canvas', () => () => <div />)

jest.mock('./renderer', () => () => <div />)

jest.mock('@extra/404', () => () => <div />)

jest.mock('@extra/background', () => () => <div />)

jest.mock('@extra/webgl', () => () => <div />)

describe('index', () => {
  test('defined', () => {
    expect(Tanatloc3D.Canvas).toBeDefined()
    expect(Tanatloc3D.Renderer).toBeDefined()
  })
})
