/** @module Route.Organization.[id] */

import { NextRequest, NextResponse } from 'next/server'

import OrganizationLib from '@/lib/organization'

import { session } from '@/route/session'
import { errorInternal, errorRequest, errorSession } from '@/route/error'

/**
 * Organizations PUT
 * @param _request Request
 * @param param { params }
 * @returns Response
 */
export const PUT = async (
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

  // Id
  const { id } = await params

  // Check
  if (!id || typeof id !== 'string')
    return errorRequest('Missing data in your request (params: { id(uuid) })')

  //Accept
  try {
    await OrganizationLib.accept({ id }, { id: sessionId })
    return NextResponse.json(null, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}

/**
 * Organizations POST
 * @param _request Request
 * @param param { params }
 * @returns Response
 */
export const POST = async (
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

  // Id
  const { id } = await params

  // Check
  if (!id || typeof id !== 'string')
    return errorRequest('Missing data in your request (params: { id(uuid) })')

  // Decline
  try {
    await OrganizationLib.decline({ id }, { id: sessionId })
    return NextResponse.json(null, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}

/**
 * Organizations DELETE
 * @param _request Request
 * @param param { params }
 * @returns Response
 */
export const DELETE = async (
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

  // Id
  const { id } = await params

  // Check
  if (!id || typeof id !== 'string')
    return errorRequest('Missing data in your request (params: { id(uuid) })')

  // Quit
  try {
    await OrganizationLib.quit({ id }, { id: sessionId })
    return NextResponse.json(null, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}
