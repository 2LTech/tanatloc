/** @module Route.User.Check */

import { NextRequest, NextResponse } from 'next/server'

import UserLib from '@/lib/user'

import { errorInternal, errorRequest } from '../../error'

export interface ILoginBody {
  email: string
  password: string
}

/**
 * Check login body
 * @param body Body
 */
const checkLoginBody = (body: ILoginBody): void => {
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

export const POST = async (request: NextRequest) => {
  // Body
  const body = await request.json()
  checkLoginBody(body)

  // Login
  try {
    const user = await UserLib.login(body)
    if (user) return NextResponse.json({ valid: true }, { status: 200 })
    else return NextResponse.json({ valid: false }, { status: 200 })
  } catch (err: any) {
    return errorInternal(err)
  }
}
