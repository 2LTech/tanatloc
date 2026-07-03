/** @module Route.Groups */

import { NextResponse } from 'next/server'

export const GET = async () => {
  return NextResponse.json({ groups: [] }, { status: 200 })
}
