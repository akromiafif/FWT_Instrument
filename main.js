const electron = require("electron");

const { app, BrowserWindow } = electron;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 700,
    // frame: false,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInSubFrames: true,
      contextIsolation: false,
    },
  });

  win.loadFile("main.html");
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  app.allowRendererProcessReuse = false;
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
