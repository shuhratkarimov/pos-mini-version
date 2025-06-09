// electron-main.js
import { app, BrowserWindow } from 'electron';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// ESM formatda __dirname va __filename ni hosil qilamiz
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    icon: join(__dirname, 'public/icon', 'favicon.ico') 
    // webPreferences: {
    //   preload: join(__dirname, 'preload.js'),
    // },
  });

  // Development (vite dev server) or Production (build)
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173'); // Vite server
  } else {
    win.loadFile(join(__dirname, 'dist/index.html'));
  }
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
