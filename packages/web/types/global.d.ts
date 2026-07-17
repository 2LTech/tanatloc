interface IMathJax {
  typesetPromise: (elements?: HTMLSpanElement[]) => Promise<void>
}

declare global {
  interface Window {
    MathJax: IMathJax
  }
}

window.MathJax = window.MathJax || {}

export {}
