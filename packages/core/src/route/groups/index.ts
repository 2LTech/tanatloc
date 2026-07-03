/** @module Route.Groups */

import { NextResponse } from 'next/server'

/**
 * Groups GET
 * @returns Response
 */
export const GET = async () => {
  return NextResponse.json({ groups: [] }, { status: 200 })
}
