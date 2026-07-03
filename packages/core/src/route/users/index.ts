/** @module Route.Users */

import { NextResponse } from 'next/server'

import UserLib from '@/lib/user'

import { session } from '@/route/session'
import { errorAccessDenied, errorInternal, errorSession } from '@/route/error'

export const GET = async () => {
  // Check session
  let sessionId
  try {
    sessionId = await session()
  } catch (err) {
    return errorSession(err)
  }

  // Check superuser
  const user = await UserLib.get(sessionId, ['superuser'])
  if (!user?.superuser) return errorAccessDenied()

  try {
    // Get all
    const users = await UserLib.getAll([
      'id',
      'firstname',
      'lastname',
      'email',
      'authorizedplugins',
      'superuser'
    ])
    return NextResponse.json({ users }, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}
