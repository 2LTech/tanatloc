/** @module Route.Simulations */

import { NextRequest, NextResponse } from 'next/server'

import SimulationLib from '@/lib/simulation'

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

  const { ids } = body

  if (!Array.isArray(ids))
    return NextResponse.json({ simulations: [] }, { status: 200 })

  // Get simulations
  const simulations = []
  for (const id of ids) {
    try {
      // Get simulation
      const simulation = await SimulationLib.get(id, [
        'name',
        'scheme',
        'project'
      ])
      if (!simulation) throw new Error('Invalid simulation identifier')

      // Check authorization
      await checkProjectAuth({ id: sessionId }, { id: simulation.project })

      simulations.push(simulation)
    } catch (err) {
      console.warn(err)
    }
  }

  return NextResponse.json({ simulations }, { status: 200 })
}
