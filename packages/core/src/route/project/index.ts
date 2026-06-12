/** @module Route.Project */

import { NextRequest, NextResponse } from 'next/server'

import ProjectLib from '@/lib/project'

import { session } from '../session'
import { checkWorkspaceAuth } from '../auth'

/**
 * Interfaces
 */
export interface IAddBody {
  workspace: { id: string }
  project: { title: string; description?: string }
}

/**
 * Check add body
 * @param body Body
 */
const checkAddBody = (body: IAddBody): void => {
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

  const { workspace, project } = body

  // Check auth
  try {
    await checkWorkspaceAuth({ id: sessionId }, workspace)
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 403 }
    )
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
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 500 }
    )
  }
}
