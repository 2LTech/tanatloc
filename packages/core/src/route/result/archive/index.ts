/** @module Route.Result.Archive */

import { NextRequest /*, NextResponse*/ } from 'next/server'

// import ResultLib from '@/lib/result'

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
  simulation: {
    id: string
  }
}

/**
 * Check POST body
 * @param body Body
 */
const checkPOSTBody = (body: IPOSTBody): void => {
  if (!body?.simulation?.id || typeof body.simulation.id !== 'string')
    throw new Error(
      'Missing data in your request (body: { simulation: { id(uuid) } }'
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

  const { simulation } = body

  // Check auth
  try {
    await checkSimulationAuth({ id: sessionId }, { id: simulation.id })
  } catch (err) {
    return errorAccessDenied(err)
  }

  try {
    // Archive
    // TODO
    // res.setHeader('Content-Type', 'application/zip')
    // const archiveStream = await ResultLib.archive(simulation)
    // archiveStream.pipe(res)
  } catch (err) {
    return errorInternal(err)
  }
}
