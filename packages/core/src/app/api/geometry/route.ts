/** @module App.API.Geometry */

export { GET, POST } from '@/route/geometry'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '150mb'
    }
  }
}
