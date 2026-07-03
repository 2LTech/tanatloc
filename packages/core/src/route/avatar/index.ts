/** @module Route.Avatar */

import { NextRequest } from 'next/server'

import AvatarLib from '@/lib/avatar'

import { session } from '@/route/session'
import { checkProjectAuth } from '@/route/auth'
import { errorInternal, errorRequest, errorSession } from '@/route/error'

// Interfaces
export interface IPOSTBody {
  file: {
    name: string
    uid: string
    data: Buffer
  }
  project?: {
    id: string
  }
}

/**
 * Check POST body
 * @param body Body
 */
const checkPOSTBody = (body: IPOSTBody): void => {
  if (
    !body?.file?.name ||
    typeof body.file.name !== 'string' ||
    !body.file.uid ||
    typeof body.file.uid !== 'string' ||
    !body.file.data ||
    typeof body.file.data !== 'string' ||
    (body.project && (!body.project.id || typeof body.project.id !== 'string'))
  )
    throw new Error(
      'Missing data in your request (body: { file: { name(string), uid(uuid), data(string) }, project?: { id(uuid) } })'
    )
}

/**
 * Avatar POST
 * @param request Request
 * @returns Response
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

  const { file, project } = body

  // Check auth
  if (project) await checkProjectAuth({ id: sessionId }, project)

  // Add
  try {
    const avatar = await AvatarLib.add(
      project || { id: sessionId },
      project ? 'project' : 'user',
      file
    )
    return Response.json(avatar, { status: 200 })
  } catch (err) {
    throw errorInternal(err)
  }
}
