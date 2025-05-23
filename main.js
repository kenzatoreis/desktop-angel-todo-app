const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 403,
    height: 480,
    resizable: false,
    icon: path.join(__dirname, 'assets/angel2.png'),
    frame: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile('index.html');

  ipcMain.on('close-window', () => {
    win.close();
  });

  ipcMain.on('minimize-window', () => {
    win.minimize();
  });
}

app.whenReady().then(createWindow);
