import Tanatloc3D from '.'

jest.mock('./canvas', () => {
  const Elem = () => <div />
  return Elem
})

jest.mock('./renderer', () => {
  const Elem = () => <div />
  return Elem
})

jest.mock('@extra/404', () => {
  const Elem = () => <div />
  return Elem
})

jest.mock('@extra/background', () => {
  const Elem = () => <div />
  return Elem
})

jest.mock('@extra/webgl', () => {
  const Elem = () => <div />
  return Elem
})

describe('index', () => {
  test('defined', () => {
    expect(Tanatloc3D.Canvas).toBeDefined()
    expect(Tanatloc3D.Renderer).toBeDefined()
  })
})
