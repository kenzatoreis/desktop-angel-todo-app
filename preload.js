const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  close: () => ipcRenderer.send('close-window'),
  minimize: () => ipcRenderer.send('minimize-window')
});
