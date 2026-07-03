/** @module Route.Plugin */

import { NextRequest, NextResponse } from 'next/server'

import type { HPCClientPlugin } from '@/plugins/index.d'

import UserLib from '@/lib/user'
import PluginLib from '@/lib/plugin'

import { session } from '@/route/session'
import {
  errorAccessDenied,
  errorInternal,
  errorRequest,
  errorSession
} from '@/route/error'

// Interfaces
export interface IPOSTBody {
  plugin: HPCClientPlugin
}

export type IPUTBody = object

export interface IDELETEBody {
  uuid: string
}

/**
 * Check POST body
 * @param body Body
 */
const checkPOSTBody = (body: IPOSTBody): void => {
  if (
    !body?.plugin ||
    typeof body.plugin.key !== 'string' ||
    !body.plugin.configuration ||
    typeof body.plugin.configuration !== 'object'
  )
    throw new Error(
      'Missing data in your request (body: { key(string), haveInit(?bool), configuration(object) }'
    )
}

/**
 * Check PUT body
 * @param body Body
 */
const checkPUTBody = (body: IPUTBody): void => {
  if (!body || typeof body !== 'object')
    throw new Error('Missing data in your request (body(object)}')
}

/**
 * Check DELETE body
 * @param body Body
 */
const checkDELETEBody = (body: IDELETEBody): void => {
  if (!body?.uuid || typeof body.uuid !== 'string')
    throw new Error('Missing data in your request (body: { uuid(uuid) } }')
}

/**
 * Plugin GET
 * @returns Response
 */
export const GET = async () => {
  // Check session
  let sessionId
  try {
    sessionId = await session()
  } catch (err) {
    return errorSession(err)
  }

  try {
    const plugins = await PluginLib.getByUser({ id: sessionId })
    return NextResponse.json({ plugins }, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}

/**
 * Plugin POST
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

  // Body
  const body = await request.json()
  try {
    checkPOSTBody(body)
  } catch (err) {
    return errorRequest(err)
  }

  const { plugin, extra, simulation } = body

  // Check authorization
  const user = await UserLib.get(sessionId, ['authorizedplugins'])
  if (!user?.authorizedplugins?.includes(plugin.key))
    return errorAccessDenied('User is not authorized to use this plugin')

  try {
    if (extra) {
      // Extra
      await PluginLib.extra(simulation, plugin, extra)
    } else {
      // Add
      await PluginLib.add({ id: sessionId }, plugin)
    }
    return NextResponse.json(null, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}

/**
 * Plugin PUT
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

  try {
    // Update
    await PluginLib.update({ id: sessionId }, body)
    return NextResponse.json(null, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}

/**
 * Plugin DELETE
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
  checkDELETEBody(body)

  try {
    await PluginLib.del({ id: sessionId }, body)
    return NextResponse.json(null, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}
