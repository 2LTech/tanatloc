/** @module Route.Workspace */

import { NextRequest, NextResponse } from 'next/server'

import { IDataBaseEntry } from '@/database/index.d'

import WorkspaceLib from '@/lib/workspace'

import { session } from '@/route/session'
import { checkWorkspaceAuth } from '@/route/auth'
import {
  errorAccessDenied,
  errorInternal,
  errorRequest,
  errorSession
} from '@/route/error'

// Interfaces
export interface IPOSTBody {
  name: string
}

export interface IPUTBody {
  workspace: {
    id: string
  }
  data: IDataBaseEntry[]
}

export interface IDELETEBody {
  id: string
}

/**
 * Check POST body
 * @param body Body
 */
const checkPOSTBody = (body: IPOSTBody): void => {
  if (!body?.name || typeof body.name !== 'string')
    throw new Error('Missing data in your request (body: { name(string) })')
}

/**
 * Check PUT body
 * @param body Body
 */
const checkPUTBody = (body: IPUTBody): void => {
  if (
    !body?.workspace?.id ||
    typeof body.workspace.id !== 'string' ||
    !body.data ||
    !Array.isArray(body.data)
  )
    throw new Error(
      'Missing data in your request (body: { workspace: { id(uuid) }, data(array) })'
    )
}

/**
 * Check delete body
 * @param body Body
 */
const checkDELETEBody = (body: IDELETEBody): void => {
  if (!body?.id || typeof body.id !== 'string')
    throw new Error('Missing data in your request (body: { id(uuid) })')
}

/**
 * GET
 * @returns GET
 */
export const GET = async () => {
  // Check session
  let sessionId
  try {
    sessionId = await session()
  } catch (err) {
    return errorSession(err)
  }

  // Get
  try {
    const workspaces = await WorkspaceLib.getByUser({ id: sessionId })
    return NextResponse.json({ workspaces }, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}

/**
 * POST
 * @param request Request
 * @returns POST
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

  // Add
  try {
    const newWorkspace = await WorkspaceLib.add({ id: sessionId }, body)
    return NextResponse.json(newWorkspace, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}

/**
 * PUT
 * @param request Request
 * @returns PUT
 */
export const PUT = async (request: NextRequest) => {
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
    checkPUTBody(body)
  } catch (err) {
    return errorRequest(err)
  }

  const { workspace, data } = body

  // Check authorization
  try {
    await checkWorkspaceAuth({ id: sessionId }, { id: workspace.id })
  } catch (err) {
    return errorAccessDenied(err)
  }

  // Update
  try {
    await WorkspaceLib.update(workspace, data)
    return NextResponse.json(null, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}

/**
 * DELETE
 * @param request Request
 * @returns DELETE
 */
export const DELETE = async (request: NextRequest) => {
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
    checkDELETEBody(body)
  } catch (err) {
    return errorRequest(err)
  }

  // Check authorization
  try {
    await checkWorkspaceAuth({ id: sessionId }, body)
  } catch (err) {
    return errorAccessDenied(err)
  }

  // Delete
  try {
    await WorkspaceLib.del({ id: sessionId }, body)
    return NextResponse.json(null, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}
