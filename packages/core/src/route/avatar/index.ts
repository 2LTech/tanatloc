/** @module Route.Avatar */

import { session } from '../session'
import { checkProjectAuth } from '../auth'
import { error } from '../error'

import AvatarLib from '@/lib/avatar'

export interface IAddBody {
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
 * Check add body
 * @param body Body
 */
const checkAddBody = (body: IAddBody): void => {
  if (
    !body?.file?.name ||
    typeof body.file.name !== 'string' ||
    !body.file.uid ||
    typeof body.file.uid !== 'string' ||
    !body.file.data ||
    typeof body.file.data !== 'string' ||
    (body.project && (!body.project.id || typeof body.project.id !== 'string'))
  )
    throw error(
      400,
      'Missing data in your request (body: { file: { name(string), uid(uuid), data(string) }, ?project: { id(uuid) } })'
    )
}

/**
 * Avatar API
 * @param req Request
 * @param res Result
 */
export const avatarPOST = async (request: Request): Promise<Response> => {
  try {
    // Check session
    const sessionId = await session(request)

    // Check
    const body = await request.json()
    checkAddBody(body)

    const { file, project } = request.body

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
    } catch (err: any) {
      throw error(500, err.message)
    }
  } catch (err: any) {
    return Response.json(
      { error: true, message: err.message },
      { status: err.status }
    )
  }
}
