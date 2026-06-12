/** @module Route.Project.[id].Copy */

import { NextRequest, NextResponse } from 'next/server'

import ProjectLib from '@/lib/project'

import { session } from '@/route/session'
import { checkProjectAuth } from '@/route/auth'

export interface IPOSTBody {
  workspace: { id: string }
}

/**
 * Check POST body
 * @param body Body
 */
const checkPOSTBody = (body: IPOSTBody): void => {
  if (!body?.workspace?.id || typeof body.workspace.id !== 'string')
    throw new Error(
      'Missing data in your request (body: { workspace: { id:string } })'
    )
}

/**
 * POST
 * @param request Request
 * @param params Params
 * @returns POST
 */
export const POST = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
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

  // Id
  const { id } = await params

  // Check authorization
  try {
    await checkProjectAuth({ id: sessionId }, { id })
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 403 }
    )
  }

  // Body
  const body = await request.json()
  try {
    checkPOSTBody(body)
  } catch (err: any) {
    return NextResponse.json(
      { err: true, message: err.message },
      { status: 400 }
    )
  }

  // Copy
  try {
    const copyProject = await ProjectLib.copy(
      { id: sessionId },
      body.workspace,
      { id }
    )
    return NextResponse.json(copyProject, {
      status: 200,
      headers: { 'Content-Type': 'application/x-tgz' }
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 500 }
    )
  }
}
