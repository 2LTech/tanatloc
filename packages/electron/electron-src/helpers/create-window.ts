/** @module Main.Helpers.CreateWindow */

import { screen, BrowserWindow } from 'electron'
import Store from 'electron-store'

export interface IWindowState {
  x: number
  y: number
  width: number
  height: number
}

/**
 * Create electron window
 * @memberof Electron
 * @param windowName Window name
 * @param options Options
 * @description Create the electron window
 */
export default (
  windowName: string,
  options: { width: number; height: number; webPreferences?: {} }
): BrowserWindow => {
  const key = 'window-state'
  const name = `window-state-${windowName}`
  const store = new Store()
  //@ts-ignore
  store.set('name', name)
  const defaultSize = {
    width: options.width,
    height: options.height
  }
  let state = {}
  let win: BrowserWindow

  /**
   * Restore store
   * @memberof Electron
   * @returns Store
   */
  //@ts-ignore
  const restore = (): any => store.get(key, defaultSize)

  /**
   * Get current position
   * @memberof Electron
   * @returns Position
   */
  const getCurrentPosition = (): IWindowState => {
    const position = win.getPosition()
    const size = win.getSize()
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1]
    }
  }

  /**
   * Window within bounds
   * @memberof Electron
   * @param windowState Window state
   * @param bounds Bounds
   * @returns Within
   */
  const windowWithinBounds = (
    windowState: IWindowState,
    bounds: IWindowState
  ): boolean => {
    return (
      windowState.x >= bounds.x &&
      windowState.y >= bounds.y &&
      windowState.x + windowState.width <= bounds.x + bounds.width &&
      windowState.y + windowState.height <= bounds.y + bounds.height
    )
  }

  /**
   * Reset to defaults
   * @memberof Electron
   * @returns Defaults
   */
  const resetToDefaults = (): IWindowState => {
    const bounds = screen.getPrimaryDisplay().bounds
    return {
      ...defaultSize,
      ...{
        x: (bounds.width - defaultSize.width) / 2,
        y: (bounds.height - defaultSize.height) / 2
      }
    }
  }

  /**
   * Ensure visibile on some display
   * @memberof Electron
   * @param windowState Window state
   * @returns Window state
   */
  const ensureVisibleOnSomeDisplay = (
    windowState: IWindowState
  ): IWindowState => {
    const visible = screen.getAllDisplays().some((display) => {
      return windowWithinBounds(windowState, display.bounds)
    })
    if (!visible) {
      // Window is partially or fully not visible now.
      // Reset it to safe defaults.
      return resetToDefaults()
    }
    return windowState
  }

  /**
   * Save state
   * @memberof Electron
   */
  const saveState = (): void => {
    if (!win.isMinimized() && !win.isMaximized()) {
      Object.assign(state, getCurrentPosition())
    }
    //@ts-ignore
    store.set(key, state)
  }

  state = ensureVisibleOnSomeDisplay(restore())

  win = new BrowserWindow({
    ...options,
    ...state,
    title: 'Tanatloc',
    webPreferences: {
      ...options.webPreferences,
      nodeIntegration: false
    }
  })

  win.on('close', saveState)

  return win
}
