/** @module Route.Organizations */

import { NextResponse } from 'next/server'

import OrganizationLib from '@/lib/organization'

import { session } from '@/route/session'
import { errorInternal, errorSession } from '@/route/error'

/**
 * Organizations GET
 * @returns Response
 */
export const GET = async () => {
  let sessionId
  try {
    // Check session
    sessionId = await session()
  } catch (err) {
    return errorSession(err)
  }

  try {
    const organizations = await OrganizationLib.getByUser({ id: sessionId }, [
      'name',
      'owners',
      'pendingowners',
      'users',
      'pendingusers',
      'groups'
    ])
    return NextResponse.json({ organizations }, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}
