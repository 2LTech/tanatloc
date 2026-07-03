/** @module Route.Geometry.[id].SplitStep */

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

// Interfaces
export interface IPOSTBody {
  project: {
    id: string
  }
}

/**
 * Check POST body
 * @param body Body
 */
const checkPOSTBody = (body: IPOSTBody): void => {
  if (!body?.project?.id || typeof body.project.id !== 'string')
    throw new Error(
      'Missing data in your request (body: { project: { id(uuid) } })'
    )
}

/**
 * Geometry [id] splitStep POST
 * @param request Request
 * @param param { params }
 * @returns Response
 */
export const POST = async (
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

  // Body
  const body = await request.json()
  try {
    checkPOSTBody(body)
  } catch (err) {
    return errorRequest(err)
  }

  const { project } = body

  try {
    // Split step
    const message = await GeometryLib.splitStep(project, { id })
    return NextResponse.json({ message }, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}
