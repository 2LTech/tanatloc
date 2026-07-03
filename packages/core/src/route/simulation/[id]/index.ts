/** @module Route.Simulation.[id] */

import { NextRequest, NextResponse } from 'next/server'

import { IDataBaseEntry } from '@/database/index.d'

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
export type IPUTBody = IDataBaseEntry[]

/**
 * Check PUT body
 * @param body Body
 */
const checkPUTBody = (body: IPUTBody): void => {
  if (!body || !Array.isArray(body))
    throw new Error('Missing data in your request (body(array))')
}

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

  // Get
  try {
    const simulation = await SimulationLib.get(id, ['name', 'scheme', 'tasks'])
    return NextResponse.json({ simulation }, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
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
    checkPUTBody(body)
  } catch (err) {
    return errorAccessDenied(err)
  }

  try {
    // Update
    await SimulationLib.update({ id }, body)
    return NextResponse.json(null, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}

export const DELETE = async (
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

  // Delete
  try {
    await SimulationLib.del({ id })
    return NextResponse.json(null, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}
