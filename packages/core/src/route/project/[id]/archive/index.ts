/** @module Route.Project.[id].Archive */

import { NextRequest, NextResponse } from 'next/server'
import { Readable } from 'node:stream'

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
 * Project [id] archive GET
 * @param _request Request
 * @param params { params }
 * @returns Response
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

    return new NextResponse(
      Readable.toWeb(archiveStream.stream) as ReadableStream,
      {
        status: 200,
        headers: {
          'content-type': 'application/x-tgz',
          'content-disposition':
            'attachment; filename="tanatloc-archive-${id}.tgz',
          'content-length': archiveStream.size + ''
        }
      }
    )
  } catch (err) {
    return errorInternal(err)
  }
}

/**
 * Project [id] archive POST
 * @param request Request
 * @param params { params }
 * @returns Response
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
 * Project [id] archive  PUT
 * @param _request Request
 * @param params { params }
 * @returns Response
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
 * Project [id] archive DELETE
 * @param _request Request
 * @param params { params }
 * @returns Response
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
