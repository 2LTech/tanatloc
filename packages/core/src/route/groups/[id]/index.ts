/** @module Route.Groups.[id] */

import { NextRequest, NextResponse } from 'next/server'

import GroupLib from '@/lib/group'

import { session } from '@/route/session'
import { checkOrganizationAuth } from '@/route/auth'
import {
  errorAccessDenied,
  errorInternal,
  errorRequest,
  errorSession
} from '@/route/error'

export const GET = async (
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  // Check session
  let sessionId
  try {
    sessionId = await session()
  } catch (err) {
    return errorSession(err)
  }

  // Id
  const { id } = await params
  if (!id || typeof id !== 'string')
    return errorRequest('Missing data in your request (params: { id(uuid) })')

  // Check auth
  try {
    await checkOrganizationAuth({ id: sessionId }, { id })
  } catch (err) {
    return errorAccessDenied(err)
  }

  try {
    // Get
    const groups = await GroupLib.getByOrganization(id, [
      'name',
      'users',
      'workspaces',
      'projects',
      'usermodels'
    ])
    return NextResponse.json({ groups }, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}
