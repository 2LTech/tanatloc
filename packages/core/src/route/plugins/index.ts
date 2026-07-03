/** @module Route.Plugins */

import { NextResponse } from 'next/server'

import UserLib from '@/lib/user'
import PluginsLib from '@/lib/plugins'

import { session } from '@/route/session'
import { errorInternal, errorSession } from '@/route/error'

/**
 * Plugins GET
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

  // Get
  try {
    // Get user data
    const user = await UserLib.get(sessionId, ['authorizedplugins'])

    // Get list
    const list = await PluginsLib.clientList(user)
    return NextResponse.json({ list }, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}

/**
 * Plugins POST
 * @returns Response
 */
export const POST = async () => {
  // Get complete
  try {
    // Get complete list
    const list = await PluginsLib.clientList(undefined, true)
    return NextResponse.json({ list }, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}
