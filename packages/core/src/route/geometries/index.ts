/** @module Route.Geometries */

import { NextRequest, NextResponse } from 'next/server'

import GeometryLib from '@/lib/geometry'

import { session } from '@/route/session'
import { checkProjectAuth } from '@/route/auth'
import { errorRequest, errorSession } from '@/route/error'

// Interfaces
export interface IPOSTBody {
  ids: string[]
}

/**
 * Check POST body
 * @param body Body
 */
const checkPOSTBody = (body: IPOSTBody): void => {
  if (!body)
    throw new Error('Missing data in your request (body: { ids(?array) })')
}

/**
 * GET
 * @param req Request
 * @param res Response
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

  // Ids
  const ids = body.ids

  if (!Array.isArray(ids))
    return NextResponse.json({ geometries: [] }, { status: 200 })

  // Get geometries
  const geometries = []
  for (const id of ids) {
    try {
      // Get geometry
      const geometry = await GeometryLib.get(id, [
        'name',
        'summary',
        'originalfilename',
        'project'
      ])
      if (!geometry) throw new Error('Invalid geometry identifier')

      // Check authorization
      await checkProjectAuth({ id: sessionId }, { id: geometry.project })

      geometries.push(geometry)
    } catch (err) {
      console.warn(err)
    }
  }

  return NextResponse.json({ geometries }, { status: 200 })
}
