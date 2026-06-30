/** @module Route.Error */

import { NextResponse } from 'next/server'

import Sentry from '@/lib/sentry'

import { IRouteError } from './index.d'

export const errors = {
  sessionError: 'Session error',
  accesDenied: 'Access denied',
  badRequest: 'Bad request',
  internalError: 'Internal error'
}

export const errorSession = (err: unknown) => {
  return NextResponse.json(
    {
      error: true,
      message:
        errors.sessionError +
        ' - ' +
        (err instanceof Error ? err.message : String(err))
    },
    { status: 401 }
  )
}

export const errorSuperuser = () => {
  return NextResponse.json(
    { error: true, message: errors.accesDenied },
    { status: 403 }
  )
}

export const errorRequest = (err: unknown) => {
  return NextResponse.json(
    {
      error: true,
      message:
        errors.badRequest +
        ' - ' +
        (err instanceof Error ? err.message : String(err))
    },
    { status: 400 }
  )
}

export const errorInternal = (err?: unknown) => {
  return NextResponse.json(
    {
      error: true,
      message:
        errors.internalError +
        ' - ' +
        (err instanceof Error ? err.message : String(err))
    },
    { status: 500 }
  )
}

/**
 * Route error
 * @param status Status code
 * @param message Message
 * @param display Display
 * @returns Error
 */
export const error = (
  status: number,
  message: string,
  display: boolean = true
) => {
  const err: IRouteError = new Error(message)
  err.status = status

  if (display) {
    console.error(err)
    Sentry.captureException(err)
  }

  return err
}
