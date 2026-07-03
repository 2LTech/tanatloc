/** @module Route.User */

import { NextResponse, NextRequest } from 'next/server'

import { IDataBaseEntry } from '@/database/index.d'

import UserLib from '@/lib/user'

import { session } from '@/route/session'
import { errorInternal, errorRequest, errorSession } from '@/route/error'

// Interfaces
export interface IPOSTBody {
  email: string
  password: string
}

export type IPUTBody = IDataBaseEntry[]

/**
 * Check POST body
 * @param body Body
 */
const checkPOSTBody = (body: IPOSTBody): void => {
  if (
    !body?.email ||
    typeof body.email !== 'string' ||
    !body.password ||
    typeof body.password !== 'string'
  )
    throw new Error(
      'Missing data in your request (body: { email(string), password(string) })'
    )
}

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

export const GET = async () => {
  // Check session
  let sessionId
  try {
    sessionId = await session()
  } catch (err) {
    return errorSession(err)
  }

  // Get
  try {
    const user = await UserLib.getWithData(sessionId, [
      'lastname',
      'firstname',
      'email',
      'avatar',
      'superuser',
      'authorizedplugins',
      'plugins',
      'usermodels'
    ])

    return NextResponse.json({ user }, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}

export const POST = async (request: NextRequest) => {
  // Body
  const body = await request.json()
  try {
    checkPOSTBody(body)
  } catch (err) {
    return errorRequest(err)
  }

  try {
    // Add
    const user = await UserLib.add(body)
    return NextResponse.json(user, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}

export const PUT = async (request: NextResponse) => {
  // Check session
  let sessionId
  try {
    sessionId = await session()
  } catch (err) {
    return errorSession(err)
  }

  // Body
  const body = await request.json()
  try {
    checkPUTBody(body)
  } catch (err) {
    return errorRequest(err)
  }

  try {
    // Update
    await UserLib.update({ id: sessionId }, body)
    return NextResponse.json(null, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}

export const DELETE = async (request: NextResponse) => {
  // Check session
  let sessionId
  try {
    sessionId = await session()
  } catch (err) {
    return errorSession(err)
  }

  // Body
  const body = await request.json()
  try {
    checkDELETEBody(body)
  } catch (err) {
    return errorRequest(err)
  }

  try {
    // Delete
    await UserLib.del({ id: sessionId })
    return NextResponse.json(null, { status: 200 })
  } catch (err: any) {
    return errorInternal(err)
  }
}
