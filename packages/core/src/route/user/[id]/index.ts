/** @module Route.User.[id] */

import { NextRequest, NextResponse } from 'next/server'

import { IDataBaseEntry } from '@/database/index.d'

import UserLib from '@/lib/user'

import { session } from '../../session'
import {
  errorInternal,
  errorRequest,
  errorSession,
  errorSuperuser
} from '../../error'

export type IUpdateBody = IDataBaseEntry[]

/**
 * Check update body
 * @param body Body
 */
const checkUpdateBody = (body: IUpdateBody): void => {
  if (!body || !Array.isArray(body))
    throw errorRequest('Missing data in your request (body(array))')
}

export const GET = async (
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  // Check session
  let sessionId
  try {
    sessionId = await session()
  } catch (err: any) {
    return errorSession(err)
  }

  // Check superuser
  const superuser = await UserLib.get(sessionId, ['superuser'])
  if (!superuser?.superuser) return errorSuperuser()

  // Id
  const { id } = await params

  // Check
  if (!id || typeof id !== 'string')
    return errorRequest('Missing data in your request (query: { id(uuid) })')

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
  } catch (err: any) {
    return errorSession(err)
  }

  // Check superuser
  const superuser = await UserLib.get(sessionId, ['superuser'])
  if (!superuser?.superuser) return errorSuperuser()

  // Id
  const { id } = await params

  // Check
  if (!id || typeof id !== 'string')
    return errorRequest('Missing data in your request (query: { id(uuid) })')

  // Check
  const body = await request.json()
  try {
    checkUpdateBody(body)
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
  } catch (err: any) {
    return errorSession(err)
  }

  // Check superuser
  const superuser = await UserLib.get(sessionId, ['superuser'])
  if (!superuser?.superuser) return errorSuperuser()

  // Id
  const { id } = await params

  // Check
  if (!id || typeof id !== 'string')
    return errorRequest('Missing data in your request (query: { id(uuid) })')

  // Check
  const body = await request.json()
  try {
    checkUpdateBody(body)
  } catch (err) {
    return errorRequest(err)
  }

  try {
    await UserLib.del({ id })
    return NextResponse.json(null, { status: 200 })
  } catch (err: any) {
    return errorInternal(err)
  }
}
