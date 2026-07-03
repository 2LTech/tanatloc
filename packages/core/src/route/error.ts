/** @module Route.Error */

import { NextResponse } from 'next/server'

import Sentry from '@/lib/sentry'

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

export const errorAccessDenied = (err?: unknown) => {
  const errorMessage = err instanceof Error ? err.message : String(err)
  return NextResponse.json(
    {
      error: true,
      message: errors.accesDenied + (err ? ' - ' + errorMessage : '')
    },
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

export const errorInternal = (err: unknown) => {
  // Display server side
  console.error(err)
  // Sentry
  Sentry.captureException(err)
  // Return response
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
