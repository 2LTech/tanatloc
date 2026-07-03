/** @module Route.System */

import { NextRequest, NextResponse } from 'next/server'

import { IDataBaseEntry } from '@/database/index.d'

import UserLib from '@/lib/user'
import SystemLib from '@/lib/system'

import { session } from '@/route/session'
import {
  errorAccessDenied,
  errorInternal,
  errorRequest,
  errorSession
} from '@/route/error'

// Interfaces
export type IPUTBody = IDataBaseEntry[]

/**
 * Check PUT body
 * @param body Body
 */
const checkPUTBody = (body: IPUTBody): void => {
  if (!body || !Array.isArray(body))
    throw new Error('Missing data in your request (body(array))')
}

export const GET = async () => {
  try {
    // Get
    const items = await SystemLib.get([
      'allowsignup',
      'password',
      'defaultplugins'
    ])
    return NextResponse.json({ system: items }, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}

export const PUT = async (request: NextRequest) => {
  // Check session
  let sessionId
  try {
    sessionId = await session()
  } catch (err) {
    return errorSession(err)
  }

  // Check superuser
  const superuser = await UserLib.get(sessionId, ['superuser'])
  if (!superuser?.superuser) return errorAccessDenied()

  // Check
  const body = await request.json()
  try {
    checkPUTBody(body)
  } catch (err) {
    return errorRequest(err)
  }

  // Update
  try {
    await SystemLib.update(body)
    return NextResponse.json(null, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}
