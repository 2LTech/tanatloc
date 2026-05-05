import { createWindow } from '..'

jest.mock('../create-window', () => () => ({}))

describe('electron-src/helpers', () => {
  test('import', () => {
    expect(createWindow).toBeDefined()
  })
})
