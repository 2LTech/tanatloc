/** @module Route.Result */

import { NextRequest, NextResponse } from 'next/server'

import ResultLib from '@/lib/result'

import { session } from '@/route/session'
import { checkSimulationAuth } from '@/route/auth'
import { errorInternal, errorRequest, errorSession } from '@/route/error'

// Interfaces
export interface IPOSTBody {
  simulation: {
    id: string
  }
  result: {
    originPath: string
    json: string
    glb: string
  }
}

/**
 * Check POST body
 * @param body Body
 */
const checkPOSTBody = (body: IPOSTBody): void => {
  if (
    !body?.simulation?.id ||
    typeof body.simulation.id !== 'string' ||
    !body.result?.originPath ||
    typeof body.result.originPath !== 'string' ||
    !body.result.glb ||
    typeof body.result.glb !== 'string'
  )
    throw new Error(
      'Missing data in your request (body: { simulation: { id(uuid) }, result: { originPath(string), glb(string) } }'
    )
}

export const POST = async (request: NextRequest) => {
  // Check session
  let sessionId
  try {
    sessionId = await session()
  } catch (err) {
    return errorSession(err)
  }

  // Body
  const body = await request.json()
  try {
    checkPOSTBody(body)
  } catch (err) {
    return errorRequest(err)
  }

  const { simulation, result } = body

  // Check auth
  await checkSimulationAuth({ id: sessionId }, { id: simulation.id })

  // Load
  try {
    const data = await ResultLib.load(simulation, result)
    return NextResponse.json({ data }, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}
