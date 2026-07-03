/** @module App.API.Noop */

import { NextResponse } from 'next/server'

// TODO check a way to remove it

export const GET = async () => {
  return NextResponse.json({ message: 'Noop API' }, { status: 200 })
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '150mb'
    }
  }
}
