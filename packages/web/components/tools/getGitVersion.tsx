/**
 * Get git version
 * @returns Git version
 */
export const getGitVersion = (): string => {
  let gitVersion = ''
  if (
    process.env.NEXT_PUBLIC_SOURCE_BRANCH &&
    process.env.NEXT_PUBLIC_SOURCE_COMMIT
  )
    gitVersion =
      'git-' +
      process.env.NEXT_PUBLIC_SOURCE_BRANCH +
      '-' +
      process.env.NEXT_PUBLIC_SOURCE_COMMIT

  return gitVersion
}
