/** @module Route.Simulation.[id].Copy */

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
  if (!id || typeof id !== 'string')
    return errorRequest('Missing data in your request (params: { id(string) })')

  // Check authorization
  try {
    await checkSimulationAuth({ id: sessionId }, { id })
  } catch (err) {
    return errorAccessDenied(err)
  }

  // Copy
  try {
    const newSimulation = await SimulationLib.copy({ id })
    return NextResponse.json({ simulation: newSimulation }, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}
