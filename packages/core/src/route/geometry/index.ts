/** @module Route.Geometry */

import { NextRequest, NextResponse } from 'next/server'

import GeometryLib from '@/lib/geometry'

import { session } from '@/route/session'
import { checkProjectAuth } from '@/route/auth'
import {
  errorAccessDenied,
  errorInternal,
  errorRequest,
  errorSession
} from '../error'

// Interfaces
export interface IPOSTBody {
  project: {
    id: string
  }
  geometry: {
    name: string
    uid: string
    buffer: Buffer
  }
}

/**
 * Check POST body
 * @param body Body
 */
const checkPOSTBody = (body: IPOSTBody): void => {
  if (
    !body?.project?.id ||
    typeof body.project.id !== 'string' ||
    !body.geometry?.name ||
    typeof body.geometry.name !== 'string' ||
    !body.geometry.uid ||
    typeof body.geometry.uid !== 'string' ||
    !body.geometry.buffer ||
    typeof body.geometry.buffer !== 'object'
  )
    throw new Error(
      'Missing data in your request (body: { project: { id(uuid) }, geometry: { name(string), uid(uuid), buffer(object) } })'
    )
}

/**
 * Geometry GET
 * @returns Response
 */
export const GET = async () => {
  // Empty route
  return NextResponse.json(null, { status: 200 })
}

/**
 * Geometry POST
 * @param request Request
 * @returns Response
 */
export const POST = async (request: NextRequest) => {
  // Check session
  let sessionId
  try {
    sessionId = await session()
  } catch (err) {
    return errorSession(err)
  }

  // Check
  const body = await request.json()
  try {
    checkPOSTBody(body)
  } catch (err) {
    return errorRequest(err)
  }

  const { project, geometry } = body

  // Check auth
  try {
    await checkProjectAuth({ id: sessionId }, project)
  } catch (err) {
    return errorAccessDenied(err)
  }

  // Add
  try {
    const newGeometry = await GeometryLib.add(project, geometry)
    return NextResponse.json(newGeometry, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}
