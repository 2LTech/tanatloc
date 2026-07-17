import { ReadonlyURLSearchParams } from 'next/navigation'

/**
 * Create query string
 * @param searchParams Search Params
 * @param queries Queries
 * @returns query string
 */
export const createQueryString = (
  searchParams: ReadonlyURLSearchParams,
  queries: { name: string; value: string }[]
) => {
  const params = new URLSearchParams(searchParams.toString())
  queries.forEach((query) => params.set(query.name, query.value))

  return params.toString()
}
