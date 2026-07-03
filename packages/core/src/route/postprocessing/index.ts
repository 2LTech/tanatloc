/** @module Route.Postprocessing */

import { NextRequest, NextResponse } from 'next/server'

import PostprocessingLib from '@/lib/postprocessing'

import { session } from '@/route/session'
import { checkSimulationAuth } from '@/route/auth'
import { errorInternal, errorRequest, errorSession } from '@/route/error'

// Interfaces
export interface IPOSTBody {
  simulation: {
    id: string
  }
  result: {
    fileName: string
    originPath: string
  }
  filter: string
  parameters: string[]
}

/**
 * Check POST body
 * @param body Body
 */
const checkPOSTBody = (body: IPOSTBody): void => {
  if (
    !body?.simulation?.id ||
    typeof body.simulation.id !== 'string' ||
    !body.result?.fileName ||
    typeof body.result.fileName !== 'string' ||
    !body.result.originPath ||
    typeof body.result.originPath !== 'string' ||
    !body.filter ||
    typeof body.filter !== 'string' ||
    !body.parameters ||
    !Array.isArray(body.parameters)
  )
    throw new Error(
      'Missing data in your request (body: { result: { fileName(string), originPath(string) }, filter: string, parameters: (string[]) }'
    )
}

/**
 * Postprocessing POST
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

  // Body
  const body = await request.json()
  try {
    checkPOSTBody(body)
  } catch (err) {
    return errorRequest(err)
  }

  const { simulation, result, filter, parameters } = body

  // Check auth
  await checkSimulationAuth({ id: sessionId }, { id: simulation.id })

  // Load
  try {
    const data = await PostprocessingLib.run(
      simulation,
      result,
      filter,
      parameters
    )
    return NextResponse.json({ data }, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}
