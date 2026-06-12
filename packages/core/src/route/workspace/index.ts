/** @module Route.Workspace */

import { NextRequest, NextResponse } from 'next/server'

import { IDataBaseEntry } from '@/database/index.d'

import WorkspaceLib from '@/lib/workspace'

import { session } from '../session'
import { checkWorkspaceAuth } from '../auth'

/**
 * Interfaces
 */
export interface IAddBody {
  name: string
}

export interface IUpdateBody {
  workspace: {
    id: string
  }
  data: IDataBaseEntry[]
}

export interface IDeleteBody {
  id: string
}

/**
 * Check add body
 * @param body Body
 */
const checkAddBody = (body: IAddBody): void => {
  if (!body?.name || typeof body.name !== 'string')
    throw new Error('Missing data in your request (body: { name(string) })')
}

/**
 * Check update body
 * @param body Body
 */
const checkUpdateBody = (body: IUpdateBody): void => {
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
const checkDeleteBody = (body: IDeleteBody): void => {
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
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 401 }
    )
  }

  // Get
  try {
    const workspaces = await WorkspaceLib.getByUser({ id: sessionId })
    return NextResponse.json({ workspaces }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 500 }
    )
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
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 401 }
    )
  }

  // Check
  const body = await request.json()
  try {
    checkAddBody(body)
  } catch (err: any) {
    return NextResponse.json(
      { err: true, message: err.message },
      { status: 400 }
    )
  }

  // Add
  try {
    const newWorkspace = await WorkspaceLib.add({ id: sessionId }, body)
    return NextResponse.json(newWorkspace, { status: 200 })
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 500 }
    )
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
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 401 }
    )
  }

  // Check
  const body = await request.json()
  try {
    checkUpdateBody(body)
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 400 }
    )
  }

  const { workspace, data } = body

  // Check authorization
  try {
    await checkWorkspaceAuth({ id: sessionId }, { id: workspace.id })
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 403 }
    )
  }

  // Update
  try {
    await WorkspaceLib.update(workspace, data)
    return NextResponse.json(null, { status: 200 })
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 500 }
    )
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
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 401 }
    )
  }

  // Check
  const body = await request.json()
  try {
    checkDeleteBody(body)
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 400 }
    )
  }

  // Check authorization
  try {
    await checkWorkspaceAuth({ id: sessionId }, body)
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 403 }
    )
  }

  // Delete
  try {
    await WorkspaceLib.del({ id: sessionId }, body)
    return NextResponse.json(null, { status: 200 })
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 50 }
    )
  }
}
