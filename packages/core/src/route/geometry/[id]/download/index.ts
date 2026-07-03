/** @module Route.Geometry.[id].Download */

import { NextRequest, NextResponse } from 'next/server'

import GeometryLib from '@/lib/geometry'

import { session } from '@/route/session'
import { checkGeometryAuth } from '@/route/auth'
import {
  errorAccessDenied,
  errorInternal,
  errorRequest,
  errorSession
} from '@/route/error'

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

  // Id
  const { id } = await params

  // Check
  if (!id || typeof id !== 'string')
    return errorRequest('Missing data in your request (params: { id(string) })')

  // Check authorization
  try {
    await checkGeometryAuth({ id: sessionId }, { id })
  } catch (err) {
    return errorAccessDenied(err)
  }

  try {
    // Download
    const part = await GeometryLib.read({ id })
    return NextResponse.json(part, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}
