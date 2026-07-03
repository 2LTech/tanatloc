/** @module App.API.Avatar */

export { POST } from '@/route/avatar'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb'
    }
  }
}
