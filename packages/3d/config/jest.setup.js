// window.matchmedia
Object.defineProperty(globalThis, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn,
    removeListener: jest.fn,
    addEventListener: jest.fn,
    removeEventListener: jest.fn,
    dispatchEvent: jest.fn
  })
})

// Resize observer
globalThis.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}))

// Message chanel (used in React19, not implemented yet in jsdom)
globalThis.MessageChannel = jest.fn().mockImplementation(() => {
  return {
    port1: {
      onMessage: jest.fn(),
      postMessage: jest.fn()
    },
    port2: {
      onMessage: jest.fn(),
      postMessage: jest.fn()
    }
  }
})
