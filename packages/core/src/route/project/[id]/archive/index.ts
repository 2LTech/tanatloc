/** @module Route.Project.[id].Archive */

import { NextRequest, NextResponse } from 'next/server'

import ProjectLib from '@/lib/project'

import { session } from '@/route/session'
import { checkProjectAuth } from '@/route/auth'
import {
  errorAccessDenied,
  errorInternal,
  errorRequest,
  errorSession
} from '@/route/error'

// Interfaces
export interface IPOSTBody {
  buffer: Buffer
}

/**
 * Check POST body
 * @param body Body
 */
const checkPOSTBody = (body: IPOSTBody) => {
  if (!body?.buffer || !Buffer.isBuffer(body.buffer))
    return new Error('Missing data in your request (body: { archive: Buffer })')
}

/**
 * GET
 * @param _request Request
 * @param params Params
 * @returns GET
 */
export const GET = async (
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  // Check session
  let sessionId
  try {
    sessionId = await session()
  } catch (err) {
    return errorSession(err)
  }

  // Id
  const { id } = await params

  // Check authorization
  try {
    await checkProjectAuth({ id: sessionId }, { id })
  } catch (err) {
    return errorAccessDenied(err)
  }

  // Archive
  try {
    const archiveStream = await ProjectLib.archive({ id })

    //TODO check if it works
    const response = new NextResponse(archiveStream)
    response.headers.set('Content-Type', 'application/x-tgz')

    return response
  } catch (err) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 500 }
    )
  }
}

/**
 * POST
 * @param request Request
 * @param params Params
 * @returns POST
 */
export const POST = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  // Check session
  let sessionId
  try {
    sessionId = await session()
  } catch (err) {
    return errorSession(err)
  }

  // Id
  const { id } = await params

  // Check authorization
  try {
    await checkProjectAuth({ id: sessionId }, { id })
  } catch (err) {
    return errorAccessDenied(err)
  }

  // Body
  const body = await request.json()
  try {
    checkPOSTBody(body)
  } catch (err) {
    return errorRequest(err)
  }

  // Unarchive
  try {
    await ProjectLib.unarchiveFromFile({ id }, body.archive)
    return NextResponse.json(null, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}

/**
 * PUT
 * @param _request Request
 * @param params Params
 * @returns PUT
 */
export const PUT = async (
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  // Check session
  let sessionId
  try {
    sessionId = await session()
  } catch (err) {
    return errorSession(err)
  }

  // Id
  const { id } = await params

  // Check authorization
  try {
    await checkProjectAuth({ id: sessionId }, { id })
  } catch (err) {
    return errorAccessDenied(err)
  }

  // Unarchive
  try {
    await ProjectLib.unarchiveFromServer({ id })
    return NextResponse.json(null, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}

/**
 * DELETE
 * @param _request Request
 * @param params Params
 * @returns DELETE
 */
export const DELETE = async (
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  // Check session
  let sessionId
  try {
    sessionId = await session()
  } catch (err) {
    return errorSession(err)
  }

  // Id
  const { id } = await params

  // Check authorization
  try {
    await checkProjectAuth({ id: sessionId }, { id })
  } catch (err) {
    return errorAccessDenied(err)
  }

  // Delete
  try {
    await ProjectLib.deleteArchiveFile({ id })
    return NextResponse.json(null, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}
