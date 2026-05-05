const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  handleStatus: (callback) => ipcRenderer.on('update-status', callback),
  handleErrors: (callback) => ipcRenderer.on('update-errors', callback)
})
