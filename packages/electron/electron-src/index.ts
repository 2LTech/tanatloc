/** @module Main */

import { app } from 'electron'
import serve from 'electron-serve'
import fixPath from 'fix-path'
import path from 'path'
import * as Sentry from '@sentry/electron/main'

import { createWindow } from './helpers'

// Sentry
if (process.env.NODE_ENV === 'production')
  Sentry.init({
    dsn: 'https://3bb27cb32e55433696022ba93cb32430@o394613.ingest.sentry.io/5428383'
  })

// Serve renderer
serve({ directory: 'renderer' })

/**
 * Start
 */
const start = async (): Promise<void> => {
  let complete = true

  console.info('Starting Tanatloc')
  await app.whenReady()

  // Fix path
  fixPath()

  // Status
  let status: string[] = []
  let errors: string[] = []

  // Client
  console.info('Starting client')
  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './helpers/preload.js')
    }
  })
  mainWindow.maximize()
  if (process.env.NODE_ENV === 'production') mainWindow.removeMenu()

  /**
   * Add status
   * @param aStatus Status
   */
  const addStatus = (aStatus: string): void => {
    status.unshift(aStatus)
    mainWindow.webContents.send('update-status', status)
  }

  /**
   * Add error
   * @param anError Error
   */
  const addError = (anError: string): void => {
    errors.unshift(anError)
    mainWindow.webContents.send('update-errors', errors)
  }

  // Start
  await mainWindow.loadURL('app://./start.html')
  addStatus('Starting client')

  // Install
  try {
    console.info('Install')
    //@ts-ignore
    const install = await import('../../extra/install/install/index.js')
    await install.default({ addStatus, addError })

    // Wait complete
    const max = 100
    let iter = 0
    //@ts-ignore
    while (!global.tanatloc.complete && iter < max) {
      await new Promise((resolve) => setTimeout(resolve, 50))
      iter++
    }
  } catch (err: any) {
    console.error('Install error')
    addError('Install error')
    addError(err.message)
    complete = false
    console.error(err)
  }

  // Server
  if (complete)
    try {
      console.info('Starting server')
      //@ts-ignore
      const server = await import('../../extra/server/server/bin/www.js')
      await server.default({ addStatus })
    } catch (err: any) {
      console.error('Server error')
      addError('Server error')
      addError(err.message)
      complete = false
    }

  // Normal start
  if (complete) {
    await mainWindow.loadURL(`app://./dashboard.html`)
  }
}
start().catch(console.error)

app.on('window-all-closed', () => {
  app.quit()
})
