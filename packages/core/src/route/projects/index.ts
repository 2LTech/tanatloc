/** @module Route.Projects */

import ProjectLib from '@/lib/project'

import { session } from '../session'
import { checkProjectAuth } from '../auth'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Interfaces
 */
export interface IPostBody {
  ids: string[]
}

/**
 * Check POST body
 * @param body Body
 */
const checkPostBody = (body: IPostBody): void => {
  if (!body)
    throw new Error('Missing data in your request (body: { ids(?array) })')
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
    checkPostBody(body)
  } catch (err: any) {
    return NextResponse.json(
      { err: true, message: err.message },
      { status: 400 }
    )
  }

  // Ids
  const { ids } = body

  if (!Array.isArray(ids)) {
    return NextResponse.json({ projects: [] }, { status: 200 })
  }

  // Get projects
  const projects = []
  for (const id of ids) {
    try {
      await checkProjectAuth({ id: sessionId }, { id })

      // Get
      const project = await ProjectLib.getWithData(id, [
        'archived',
        'title',
        'description',
        'createddate',
        'lastaccess',
        'avatar',
        'owners',
        'users',
        'groups',
        'simulations',
        'workspace'
      ])
      if (!project) throw new Error('Invalid project identifier')

      projects.push(project)
    } catch (err) {
      console.warn(err)
    }
  }

  return NextResponse.json({ projects }, { status: 200 })
}
