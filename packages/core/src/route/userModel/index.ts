/** @module Route.UserModel */

import { NextRequest, NextResponse } from 'next/server'

import { IDataBaseEntry } from '@/database/index.d'

import { IModel } from '@/models/index.d'

import UserModelLib from '@/lib/userModel'

import { session } from '@/route/session'
import { errorInternal, errorRequest, errorSession } from '@/route/error'

// Interfaces
export interface IPOSTBody {
  userModel: {
    model: IModel
    template: string
  }
}

export interface IPUTBody {
  userModel: {
    id: string
  }
  data: IDataBaseEntry[]
}

export interface IDELETEBody {
  userModel: {
    id: string
  }
}

/**
 * Check POST body
 * @param body Body
 */
const checkPOSTBody = (body: IPOSTBody): void => {
  if (
    !body?.userModel?.model ||
    typeof body.userModel.model !== 'object' ||
    !body.userModel.template ||
    typeof body.userModel.template !== 'string'
  )
    throw new Error(
      'Missing data in your request (body: { userModel: { model(IModel), template(string) } })'
    )
}

/**
 * Check PUT body
 * @param body Body
 */
const checkPUTBody = (body: IPUTBody): void => {
  if (
    !body?.userModel?.id ||
    typeof body.userModel.id !== 'string' ||
    !body.data ||
    !Array.isArray(body.data)
  )
    throw new Error(
      'Missing data in your request (body: { userModel: { id(string) }, data(array) })'
    )
}

/**
 * Check DELETE body
 * @param body Body
 */
const checkDELETEBody = (body: IDELETEBody): void => {
  if (!body?.userModel?.id || typeof body.userModel.id !== 'string')
    throw new Error(
      'Missin data in your request (body: { userModel: { id(string) } })'
    )
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

  const { userModel } = body

  // Add
  try {
    const newUserModel = await UserModelLib.add(userModel, {
      id: sessionId
    })
    return NextResponse.json({ model: newUserModel }, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}

export const PUT = async (request: NextRequest) => {
  // Check session
  try {
    await session()
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

  const { userModel, data } = body

  // Update
  try {
    await UserModelLib.update(userModel, data)
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

  const { userModel } = body

  // Delete
  try {
    await UserModelLib.del({ id: sessionId }, userModel)
    return NextResponse.json(null, { status: 200 })
  } catch (err) {
    return errorInternal(err)
  }
}
