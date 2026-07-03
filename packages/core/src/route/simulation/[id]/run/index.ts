/** @module Route.Simulation.[id].Run */

import { NextRequest, NextResponse } from 'next/server'

import SimulationLib from '@/lib/simulation'

import { session } from '@/route/session'
import { checkSimulationAuth } from '@/route/auth'
import {
  errorAccessDenied,
  errorInternal,
  errorRequest,
  errorSession
} from '@/route/error'

// Interfaces
export interface IPOSTBody {
  keepMesh?: boolean
}

/**
 * Check POST body
 * @param body Body
 */
const checkPOSTBody = (body: IPOSTBody): void => {
  if (!body)
    throw new Error(
      'Missing data in your request (body: { keepMesh(boolean?) })'
    )
}

export const PUT = async (
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
  if (!id || typeof id !== 'string')
    return errorRequest('Missing data in your request (params: { id(string) })')

  // Check authorization
  try {
    await checkSimulationAuth({ id: sessionId }, { id })
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

  const { keepMesh } = body

  // Run
  try {
    await SimulationLib.run({ id: sessionId }, { id }, keepMesh)
    return NextResponse.json(null, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}
