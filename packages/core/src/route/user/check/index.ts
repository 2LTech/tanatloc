/** @module Route.User.Check */

import { NextRequest, NextResponse } from 'next/server'

import UserLib from '@/lib/user'

import { errorInternal, errorRequest } from '@/route/error'

// Interfaces
export interface IPOSTBody {
  email: string
  password: string
}

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

export const POST = async (request: NextRequest) => {
  // Body
  const body = await request.json()
  try {
    checkPOSTBody(body)
  } catch (err) {
    return errorRequest(err)
  }

  // Login
  try {
    const user = await UserLib.login(body)
    if (user) return NextResponse.json({ valid: true }, { status: 200 })
    else return NextResponse.json({ valid: false }, { status: 200 })
  } catch (err: any) {
    return errorInternal(err)
  }
}
