/** @module Server.Bin */

import app from '../app'
import { createServer } from 'node:http'

// @ts-expect-error @ts2307 relative to electron dist
import init from '../../tanatloc/src/server/init'
// @ts-expect-error @ts2307 relative to electron dist
import clean from '../../tanatloc/src/server/clean'

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val: string): boolean | number | string => {
  const p = Number.parseInt(val, 10)

  if (Number.isNaN(p)) {
    // named pipe
    return val
  }

  if (p >= 0) {
    // port number
    return p
  }

  return false
}

/**
 * www
 */
const www = async ({
  addStatus
}: {
  addStatus: (status: string) => Promise<void>
}): Promise<void> => {
  addStatus('Starting server')

  // Initialize
  Object.defineProperty(globalThis, 'tanatloc', {
    value: {},
    configurable: true
  })
  try {
    await init({ addStatus })
  } catch (err: any) {
    console.error('Initialization failed!')
    console.error(err)
    throw err
  }

  // Clean
  const handleExit = async (code: number): Promise<void> => {
    console.info('> Server stopped')
    try {
      await clean()
      process.exit(code)
    } catch (err) {
      console.error('Clean failed!')
      console.error(err)

      throw err
    }
  }

  process.on('exit', (code) => {
    handleExit(code).catch(console.error)
  })

  /**
   * Get port from environment and store in Express.
   */
  const port = normalizePort(process.env.PORT || '3000')
  app.set('port', port)

  /**
   * Create HTTP server.
   */
  const server = createServer(app)

  /**
   * Event listener for HTTP server "error" event.
   */
  const onError = (error: Error & { code: string; syscall: string }) => {
    if (error.syscall !== 'listen') {
      throw error
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges')
        throw new Error(
          'Server error: ' + bind + ' requires elevated privileges'
        )
      case 'EADDRINUSE':
        console.error(bind + ' is already in use')
        throw new Error('Server error: ' + bind + ' is already in use')

      default:
        throw error
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */
  const onListening = () => {
    const addr = server.address()!
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port

    console.log('Listening on ' + bind)
  }

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port)
  server.on('listening', onListening)
  server.on('error', onError)
}

export default www
