/** @module Route.Project.[id] */

import { NextRequest, NextResponse } from 'next/server'

import { IDataBaseEntry } from '@/database/index.d'

import ProjectLib from '@/lib/project'

import { session } from '../session'
import { checkProjectAuth } from '../auth'

/**
 * Interfaces
 */
export type IUpdateBody = IDataBaseEntry[]

export interface IDeleteBody {
  id: string
}

/**
 * Check update body
 * @param body Body
 */
const checkUpdateBody = (body: IUpdateBody): void => {
  if (!body || !Array.isArray(body))
    throw new Error('Missing data in your request (body(array))')
}

/**
 * Check delete body
 * @param body Body
 */
const checkDeleteBody = (body: IDeleteBody): void => {
  if (!body?.id || typeof body.id !== 'string')
    throw new Error('Missing data in your request (body: { id(uuid) })')
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
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 401 }
    )
  }

  // Id
  const { id } = await params

  // Check authorization
  try {
    await checkProjectAuth({ id: sessionId }, { id })
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 403 }
    )
  }

  try {
    const project = await ProjectLib.getWithData(id, [
      'title',
      'description',
      'avatar',
      'owners',
      'users',
      'geometries',
      'simulations'
    ])

    return NextResponse.json({ project }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 500 }
    )
  }
}

/**
 * PUT
 * @param request Request
 * @param params Params
 * @returns PUT
 */
export const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  // Check session
  let sessionId
  try {
    sessionId = await session()
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 401 }
    )
  }

  // Id
  const { id } = await params

  // Check authorization
  try {
    await checkProjectAuth({ id: sessionId }, { id })
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 403 }
    )
  }

  // Check
  const body = await request.json()
  try {
    checkUpdateBody(body)
  } catch (err: any) {
    return NextResponse.json(
      { err: true, message: err.message },
      { status: 400 }
    )
  }

  // Update
  try {
    await ProjectLib.update({ id }, body)
    return NextResponse.json(null, { status: 200 })
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 500 }
    )
  }
}

/**
 * DELETE
 * @param request Request
 * @param params Params
 * @returns DELETE
 */
export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  // Check session
  let sessionId
  try {
    sessionId = await session()
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 401 }
    )
  }

  // Id
  const { id } = await params

  // Check authorization
  try {
    await checkProjectAuth({ id: sessionId }, { id })
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 403 }
    )
  }

  // Check
  const body = await request.json()
  try {
    checkDeleteBody(body)
  } catch (err: any) {
    return NextResponse.json(
      { err: true, message: err.message },
      { status: 400 }
    )
  }

  // Delete
  try {
    await ProjectLib.del(body, { id })
    return NextResponse.json(null, { status: 200 })
  } catch (err: any) {
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 500 }
    )
  }
}
