import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'node:path';
import fs from 'node:fs/promises';

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

  return win;
}

async function hasParamFile(jobFilePath: string): Promise<boolean> {
  try {
    const entries = await fs.readdir(path.dirname(jobFilePath));
    return entries.some((name) => name.toLowerCase() === 'all.prm');
  } catch {
    return false;
  }
}

ipcMain.handle('job:open-dialog', async (event) => {
  const win = BrowserWindow.fromWebContents(event.sender) ?? undefined;
  const result = await dialog.showOpenDialog(win, {
    title: 'Select Job',
    filters: [
      { name: 'JBI Files', extensions: ['jbi', 'JBI'] },
      { name: 'All Files', extensions: ['*'] },
    ],
    properties: ['openFile'],
  });
  if (result.canceled || result.filePaths.length === 0) return null;
  const filePath = result.filePaths[0];
  const content = await fs.readFile(filePath, 'utf-8');
  const paramFileFound = await hasParamFile(filePath);
  return { filePath, content, paramFileFound };
});

ipcMain.handle('job:save-as-dialog', async (event, defaultName: string) => {
  const win = BrowserWindow.fromWebContents(event.sender) ?? undefined;
  const result = await dialog.showSaveDialog(win, {
    title: 'Save As',
    defaultPath: defaultName,
    filters: [
      { name: 'JBI Files', extensions: ['jbi', 'JBI'] },
      { name: 'All Files', extensions: ['*'] },
    ],
  });
  if (result.canceled || !result.filePath) return null;
  return result.filePath;
});

ipcMain.handle('job:write-file', async (_event, filePath: string, content: string) => {
  await fs.writeFile(filePath, content, 'utf-8');
  return true;
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
