/** @module Route.Organizations */

import { NextResponse } from 'next/server'

import OrganizationLib from '@/lib/organization'

import { session } from '../session'

/**
 * Organizations API
 * @param req Request
 * @param res Response
 */
export const GET = async () => {
  let sessionId
  try {
    // Check session
    sessionId = await session()
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 401 }
    )
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
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 500 }
    )
  }
}
