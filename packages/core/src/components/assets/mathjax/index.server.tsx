import Script from 'next/script'

/**
 * Head
 * @returns Head
 */
const Head: React.FunctionComponent = () => (
  <Script src="/mathjax/tex-mml-chtml.js" />
)

const MathJax = { Head }
export default MathJax
