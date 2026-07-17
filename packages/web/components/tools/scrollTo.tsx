/**
 * Scroll to view
 * @param id
 */
export const scrollToView = (id: string): void => {
  const header = document.getElementById('header')
  const target = document.getElementById(id)

  if (target && header) {
    const y = target?.offsetTop - header?.offsetHeight - 30
    scrollTo({ top: y, behavior: 'smooth' })
  }
}

/**
 * Scroll to features
 */
export const scrollToFeatures = () => scrollToView('features')

/**
 * Scroll to get started
 */
export const scrollToGetStarted = () => scrollToView('get-started')

/**
 * Scroll to developers
 */
export const scrollToDevelopers = () =>
  window.open('https://github.com/2LTech/tanatloc', '_blank', 'noopener')

/**
 * Scroll to blog
 */
export const scrollToBlog = () => window.open('/blog', '_blank', 'noopener')

/**
 * Scroll to doc
 */
export const scrollToDoc = () => window.open('/doc', '_blank', 'noopener')

/**
 * Scroll to case study
 */
export const scrollToCaseStudy = () => scrollToView('caseStudy')

/**
 * Scroll to about us
 */
export const scrollToAboutUs = () => scrollToView('aboutUs')
