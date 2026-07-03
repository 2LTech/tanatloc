/** @module Route.Organization */

import { NextRequest, NextResponse } from 'next/server'

import { IDataBaseEntry } from '@/database/index.d'

import OrganizationLib from '@/lib/organization'

import { session } from '@/route/session'
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
  organization: {
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
    !body?.organization?.id ||
    typeof body.organization.id !== 'string' ||
    !body.data ||
    !Array.isArray(body.data)
  )
    throw new Error(
      'Missing data in your request (body: { id(uuid), data(array) })'
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
 * Check organization administrator
 * @param organization organization
 * @param user User
 */
const checkOrganizationAdministrator = async (
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

export const POST = async (request: NextRequest) => {
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
    checkPOSTBody(body)
  } catch (err) {
    return errorRequest(err)
  }

  // Add
  try {
    const organization = await OrganizationLib.add({ id: sessionId }, body)
    return NextResponse.json(organization, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}

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

  const { organization, data } = body

  // Check administrator
  try {
    await checkOrganizationAdministrator(organization, {
      id: sessionId
    })
  } catch (err) {
    return errorAccessDenied(err)
  }

  // Update
  try {
    await OrganizationLib.update(organization, data, sessionId)
    return NextResponse.json(null, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}

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

  // Check administrator
  try {
    await checkOrganizationAdministrator(body, { id: sessionId })
  } catch (err) {
    return errorAccessDenied(err)
  }

  try {
    // Delete
    await OrganizationLib.del(body)
    return NextResponse.json(null, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}
