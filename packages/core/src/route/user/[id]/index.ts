/** @module Route.User.[id] */

import { NextRequest, NextResponse } from 'next/server'

import { IDataBaseEntry } from '@/database/index.d'

import UserLib from '@/lib/user'

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

/**
 * Check DELETE body
 * @param body Body
 */
const checkDELETEBody = checkPUTBody

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

  // Check superuser
  const superuser = await UserLib.get(sessionId, ['superuser'])
  if (!superuser?.superuser) return errorAccessDenied()

  // Id
  const { id } = await params

  // Check
  if (!id || typeof id !== 'string')
    return errorRequest('Missing data in your request (params: { id(uuid) })')

  try {
    const user = await UserLib.getWithData(id, [
      'lastname',
      'firstname',
      'email',
      'avatar',
      'plugins',
      'superuser',
      'authorizedplugins'
    ])
    return NextResponse.json({ user }, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}

export const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
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

  // Id
  const { id } = await params

  // Check
  if (!id || typeof id !== 'string')
    return errorRequest('Missing data in your request (params: { id(uuid) })')

  // Check
  const body = await request.json()
  try {
    checkPUTBody(body)
  } catch (err) {
    return errorRequest(err)
  }

  try {
    // Update
    await UserLib.update({ id }, body)
    return NextResponse.json(null, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
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

  // Id
  const { id } = await params

  // Check
  if (!id || typeof id !== 'string')
    return errorRequest('Missing data in your request (params: { id(uuid) })')

  // Check
  const body = await request.json()
  try {
    checkDELETEBody(body)
  } catch (err) {
    return errorRequest(err)
  }

  try {
    await UserLib.del({ id })
    return NextResponse.json(null, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}
