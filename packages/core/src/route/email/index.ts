/** @module Route.Email */

import { NextRequest, NextResponse } from 'next/server'

import { PASSWORD_RECOVERY } from '@/config/email'

import EmailLib from '@/lib/email'
import UserLib from '@/lib/user'

import { errorInternal, errorRequest } from '@/route/error'

// Interfaces
export interface IPUTBody {
  email: string
  type: string
}

/**
 * Check PUT body
 * @param body Body
 */
const checkPUTBody = (body: IPUTBody): void => {
  if (
    !body?.type ||
    typeof body.type !== 'string' ||
    !body.email ||
    typeof body.email !== 'string'
  )
    throw new Error(
      'Missing data in your request (body: { email(string), type(string) }'
    )
}

/**
 * Email PUT
 * @param request Request
 * @returns Response
 */
export const PUT = async (request: NextRequest) => {
  const body = await request.json()
  try {
    checkPUTBody(body)
  } catch (err) {
    return errorRequest(err)
  }

  const { email, type } = body

  if (type === PASSWORD_RECOVERY) {
    try {
      // Check if user exists
      const existingUser = await UserLib.getBy(email, [], 'email')

      // Recover
      if (existingUser) await EmailLib.recover(email)
      return NextResponse.json(null, { status: 200 })
    } catch (err) {
      return errorInternal(err)
    }
  } else {
    // Wrong type
    return errorRequest('Type ' + type + ' not allowed')
  }
}
