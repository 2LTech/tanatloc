/** @module Route.Session */

import { getSession } from '@2ltech/nextjs-app-passport'

import UserLib from '@/lib/user'

/**
 * Session
 * @param req Request
 */
export const session = async (): Promise<string> => {
  const s = await getSession()
  if (!s?.id) throw new Error('Unauthorized')

  const user = await UserLib.get(s.id, [])
  if (!user) throw new Error('Unauthorized')

  return s.id
}
