/** @module Route.Projects */

import { NextRequest, NextResponse } from 'next/server'

import ProjectLib from '@/lib/project'

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

  // Check
  const body = await request.json()
  try {
    checkPOSTBody(body)
  } catch (err) {
    return errorRequest(err)
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
