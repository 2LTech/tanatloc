/** @module Route.User */

import { NextResponse, NextRequest } from 'next/server'

import { IDataBaseEntry } from '@/database/index.d'

import UserLib from '@/lib/user'

import { session } from '../session'
import { errorInternal, errorRequest, errorSession } from '../error'

export interface IAddBody {
  email: string
  password: string
}

export type IUpdateBody = IDataBaseEntry[]

/**
 * Check add body
 * @param body Body
 */
const checkAddBody = (body: IAddBody): void => {
  if (
    !body?.email ||
    typeof body.email !== 'string' ||
    !body.password ||
    typeof body.password !== 'string'
  )
    throw errorRequest(
      'Missing data in your request (body: { email(string), password(string) })'
    )
}

/**
 * Check update body
 * @param body Body
 */
const checkUpdateBody = (body: IUpdateBody): void => {
  if (!body || !Array.isArray(body))
    throw errorRequest('Missing data in your request (body(array))')
}

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
  checkAddBody(body)

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
  checkUpdateBody(body)

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
  checkUpdateBody(body)

  try {
    // Delete
    await UserLib.del({ id: sessionId })
    return NextResponse.json(null, { status: 200 })
  } catch (err: any) {
    return errorInternal(err)
  }
}
