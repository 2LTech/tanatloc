/** @module Route.System */

import { NextRequest, NextResponse } from 'next/server'

import { IDataBaseEntry } from '@/database/index.d'

import UserLib from '@/lib/user'
import SystemLib from '@/lib/system'

import { session } from '../session'

export type IUpdateBody = IDataBaseEntry[]

/**
 * Check update body
 * @param body Body
 */
const checkUpdateBody = (body: IUpdateBody): void => {
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
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 500 }
    )
  }
}

export const PUT = async (request: NextRequest) => {
  // Check session
  let sessionId
  try {
    sessionId = await session()
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 401 }
    )
  }

  // Check superuser
  const superuser = await UserLib.get(sessionId, ['superuser'])
  if (!superuser?.superuser)
    return NextResponse.json(
      { error: true, message: 'Access denied' },
      { status: 403 }
    )

  // Check
  const body = await request.json()
  try {
    checkUpdateBody(body)
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 400 }
    )
  }

  // Update
  try {
    await SystemLib.update(body)
    return NextResponse.json(null, { status: 200 })
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 500 }
    )
  }
}
