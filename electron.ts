import { app, BrowserWindow, ipcMain, PrintToPDFOptions } from "electron";
import path from "path";
import isDev from "electron-is-dev";
import { printLabel } from "./electron/print";
import installExtension, { REDUX_DEVTOOLS } from "electron-devtools-installer";



let mainWindow: BrowserWindow | null;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.join(__dirname, "public", "preload.js"),
		},
	});
	mainWindow.maximize();
	mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "public", "index.html")}`);

	mainWindow.on("closed", () => {
		mainWindow = null;
	});
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (mainWindow === null) {
		createWindow();
	}
});

ipcMain.on("print-label", (event, labelText) => {
	printLabel(event, {
		printer: "HP79D469 (HP ENVY 5660 series)",
		copies: 1,
		template: {
			name: "4_6",
			width: 4,
			height: 6,
		},
		data: {
			labelText,
		},
	});
});

ipcMain.on("print-label-auto", (event, labelText) => {
	// printLabel(event);
});


app.whenReady().then(() => {
	installExtension(REDUX_DEVTOOLS)
		.then((name) => console.log(`Added Extension: ${name}`))
		.catch((err) => console.log("An error occurred: ", err));
});

