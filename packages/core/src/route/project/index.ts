/** @module Route.Project */

import { NextRequest, NextResponse } from 'next/server'

import ProjectLib from '@/lib/project'

import { session } from '@/route/session'
import { checkWorkspaceAuth } from '@/route/auth'
import {
  errorAccessDenied,
  errorInternal,
  errorRequest,
  errorSession
} from '../error'

// Interfaces
export interface IPOSTBody {
  workspace: { id: string }
  project: { title: string; description?: string }
}

/**
 * Check POST body
 * @param body Body
 */
const checkPOSTBody = (body: IPOSTBody): void => {
  if (
    !body?.workspace?.id ||
    typeof body.workspace.id !== 'string' ||
    !body.project?.title ||
    typeof body.project.title !== 'string'
  )
    throw new Error(
      'Missing data in your request (body: { workspace: { id(uuid) }, project: { title(string), description(?string) } }'
    )
}

export const GET = async () => {
  // Empty route
  return NextResponse.json(null, { status: 200 })
}

export const POST = async (request: NextRequest) => {
  // Check session
  let sessionId
  try {
    sessionId = await session()
  } catch (err: any) {
    return errorSession(err)
  }

  // Body
  const body = await request.json()
  try {
    checkPOSTBody(body)
  } catch (err) {
    return errorRequest(err)
  }

  const { workspace, project } = body

  // Check auth
  try {
    await checkWorkspaceAuth({ id: sessionId }, workspace)
  } catch (err) {
    return errorAccessDenied(err)
  }

  // Add
  try {
    const newProject = await ProjectLib.add(
      { id: sessionId },
      workspace,
      project
    )
    return NextResponse.json(newProject, { status: 200 })
  } catch (err: any) {
    return errorInternal(err)
  }
}
