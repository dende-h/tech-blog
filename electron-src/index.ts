import { join } from "path";
import { format } from "url";
import { BrowserWindow, app, shell } from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";

app.on("ready", async () => {
  await prepareNext(".");

  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      preload: join(__dirname, "preload.ts"),
    },
  });

  mainWindow.webContents.on("new-window", (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  const url = isDev
    ? "http://localhost:8000/"
    : format({
        pathname: join(__dirname, "../out/index.html"),
        protocol: "file:",
        slashes: true,
      });

  mainWindow.loadURL(url);
});

app.on("window-all-closed", app.quit);