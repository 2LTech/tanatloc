/** @module Route.Group */

import { NextRequest, NextResponse } from 'next/server'

import { IDataBaseEntry } from '@/database/index.d'

import OrganizationLib from '@/lib/organization'
import GroupLib from '@/lib/group'

import { session } from '@/route/session'
import {
  errorAccessDenied,
  errorInternal,
  errorRequest,
  errorSession
} from '@/route/error'

// Interfaces
export interface IPOSTBody {
  organization: {
    id: string
  }
  group: {
    name: string
    users: string[]
  }
}

export interface IPUTBody {
  group: {
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
  if (
    !body?.organization?.id ||
    typeof body.organization.id !== 'string' ||
    !body.group?.name ||
    typeof body.group.name !== 'string' ||
    !body.group.users ||
    !Array.isArray(body.group.users)
  )
    throw new Error(
      'Missing data in your request (body: { organization: { id(uuid) }, group: { name(string), users(array) } })'
    )
}

/**
 * Check PUT body
 * @param body Body
 */
const checkPUTBody = (body: IPUTBody): void => {
  if (
    !body?.group?.id ||
    typeof body.group.id !== 'string' ||
    !body.data ||
    !Array.isArray(body.data)
  )
    throw new Error(
      'Missing data in your request (body: { group: { id(uuid) }, data(array) })'
    )
}

/**
 * Check DELETE body
 * @param body Body
 */
const checkDELETEBody = (body: IDELETEBody): void => {
  if (!body?.id || typeof body.id !== 'string')
    throw new Error('Missing data in your request (body: { id(uuid) })')
}

/**
 * Check organization auth
 * @param organization Organization { id }
 * @param user User { id }
 */
const checkOrganizationAuth = async (
  organization: { id: string },
  user: { id: string }
): Promise<void> => {
  const organizationData = await OrganizationLib.get(organization.id, [
    'owners'
  ])
  if (!organizationData) throw new Error('Invalid organization identifier')

  if (!organizationData?.owners?.includes(user.id))
    throw new Error('User is not in owners of organization')
}

/**
 * Check group auth
 * @param group Group { id }
 * @param user User { id }
 */
const checkGroupAuth = async (
  group: { id: string },
  user: { id: string }
): Promise<void> => {
  const groupData = await GroupLib.get(group.id, ['organization'])
  if (!groupData) throw new Error('Invalid group identifier')

  const organizationData = await OrganizationLib.get(groupData.organization, [
    'owners'
  ])

  if (!organizationData?.owners?.includes(user.id))
    throw new Error('User is not in owners of organization')
}

/**
 * Group POST
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

  const { organization, group } = body

  // Check auth
  try {
    await checkOrganizationAuth(organization, { id: sessionId })
  } catch (err) {
    return errorAccessDenied(err)
  }

  // Add
  try {
    const newGroup = await GroupLib.add(organization, group)
    return NextResponse.json(newGroup, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}

/**
 * Group PUT
 * @param request Request
 * @returns Response
 */
export const PUT = async (request: NextRequest) => {
  // Check session
  let sessionId
  try {
    sessionId = await session()
  } catch (err) {
    return errorSession(err)
  }

  // Body
  const body = await request.json()
  try {
    checkPUTBody(body)
  } catch (err) {
    return errorRequest(err)
  }

  const { group, data } = body

  // Check auth
  try {
    await checkGroupAuth(group, { id: sessionId })
  } catch (err) {
    return errorAccessDenied(err)
  }

  // Update
  try {
    await GroupLib.update(group, data)
    return NextResponse.json(null, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}

/**
 * Group DELETE
 * @param request Request
 * @returns Response
 */
export const DELETE = async (request: NextRequest) => {
  // Check session
  let sessionId
  try {
    sessionId = await session()
  } catch (err) {
    return errorSession(err)
  }

  // Body
  const body = await request.json()
  try {
    checkDELETEBody(body)
  } catch (err) {
    return errorRequest(err)
  }

  const { id } = body

  // Check administrator
  try {
    await checkGroupAuth({ id }, { id: sessionId })
  } catch (err) {
    return errorAccessDenied(err)
  }

  // Delete
  try {
    await GroupLib.del(body)
    return NextResponse.json(null, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}
