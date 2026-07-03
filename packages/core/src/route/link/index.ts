/** @module Route.Link */

import { NextRequest, NextResponse } from 'next/server'

import LinkLib from '@/lib/link'

import { errorInternal, errorRequest } from '@/route/error'

// Interfaces
export interface IPOSTBody {
  id: string
  data: string[]
}

export interface IPUTBody {
  id: string
  data?: {
    email: string
    password: string
  }
}

/**
 * Check POST body
 * @param body Body
 */
const checkPOSTBody = (body: IPOSTBody): void => {
  if (
    !body?.id ||
    typeof body.id !== 'string' ||
    !body.data ||
    !Array.isArray(body.data)
  )
    throw new Error(
      'Missing data in your request (body: { id(uuid), data(array) })'
    )
}

/**
 * Check PUT body
 * @param body Body
 */
const checkPUTBody = (body: IPUTBody): void => {
  if (!body?.id || typeof body.id !== 'string')
    throw new Error(
      'Missing data in your request (body: { id(uuid), data(?object) })'
    )
}

/**
 * Link POST
 * @param request Request
 * @returns Response
 */
export const POST = async (request: NextRequest) => {
  // Body
  const body = await request.json()
  try {
    checkPOSTBody(body)
  } catch (err) {
    return errorRequest(err)
  }

  const { id, data } = body

  // Get
  try {
    const link = await LinkLib.get(id, data)
    return NextResponse.json(link, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}

export const PUT = async (request: NextRequest) => {
  // Body
  const body = await request.json()
  try {
    checkPUTBody(body)
  } catch (err) {
    return errorRequest(err)
  }

  const { id, data } = body

  // Process
  try {
    await LinkLib.process(id, data)
    return NextResponse.json(null, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}
