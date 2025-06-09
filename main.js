const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    win.loadURL('http://localhost:5173');
}

ipcMain.on('save-reservation', (event, data) => {
    const filePath = path.join(__dirname, 'reservations.json');
    let reservations = [];

    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath);
        reservations = JSON.parse(fileData);
    }

    reservations.push(data);

    fs.writeFileSync(filePath, JSON.stringify(reservations, null, 2));
});

ipcMain.handle('get-reservations', () => {
    const filePath = path.join(__dirname, 'reservations.json');

    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    }

    return [];
});

ipcMain.handle('delete-reservations', () => {
    const filePath = path.join(__dirname, 'reservations.json');
  
    if (fs.existsSync(filePath)) {
      const rawData = fs.readFileSync(filePath);
      const reservations = JSON.parse(rawData);
  
      const now = new Date();
  
      const filtered = reservations.filter(r => {
        const resDate = new Date(`${r.date}T${r.time}`);
        return resDate >= now;
      });
  
      fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2), 'utf-8');
      return filtered; 
    }
  
    return [];
  });
  

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().lenght === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});