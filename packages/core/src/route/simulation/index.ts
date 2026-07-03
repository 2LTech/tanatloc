/** @module Route.Simulation */

import { NextRequest, NextResponse } from 'next/server'

import { IModel } from '@/models/index.d'

import SimulationLib from '@/lib/simulation'

import { session } from '@/route/session'
import { checkProjectAuth } from '@/route/auth'
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
  simulation: {
    name: string
    scheme: IModel
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
    !body.simulation?.name ||
    typeof body.simulation.name !== 'string' ||
    !body.simulation.scheme ||
    typeof body.simulation.scheme !== 'object'
  )
    throw new Error(
      'Missing data in your request (body: { project: { id(uuid) }, simulation: { name(string), scheme(object) } }'
    )
}

export const GET = async () => {
  return NextResponse.json(null, { status: 200 })
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

  const { project, simulation } = body

  // Check auth
  try {
    await checkProjectAuth({ id: sessionId }, { id: project.id })
  } catch (err) {
    return errorAccessDenied(err)
  }

  // Add
  try {
    const newSimulation = await SimulationLib.add(project, simulation)
    return NextResponse.json(newSimulation, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}
