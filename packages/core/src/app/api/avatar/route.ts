/** @module Pages.API.Avatar */

import { avatarPOST } from '@/route/avatar'
import { NextRequest } from 'next/server'

/**
 * Avatar API
 * @param request Request
 */
export const POST = async (request: NextRequest) => avatarPOST(request)

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb'
    }
  }
}
