/**
 * String to color
 * @param str String
 * @returns HSL color
 */
export const stringToColor = (str?: string): string => {
  if (!str) return '#FFFFFF'

  const stringHash = Array.from(str).reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc)
  }, 0)

  return 'hsl(' + (stringHash % 360) + ', 100%, 25%)'
}
