import { app, BrowserWindow } from 'electron';
import path from 'node:path';

const isDev = !app.isPackaged;
const dirname = import.meta.dirname;

function createWindow() {
  const win = new BrowserWindow({
    width: 1320,
    height: 800,
    minWidth: 1000,
    minHeight: 600,
    autoHideMenuBar: true,
    icon: path.join(dirname, '../build-resources/icon.png'),
    webPreferences: {
      preload: path.join(dirname, 'preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev && process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
