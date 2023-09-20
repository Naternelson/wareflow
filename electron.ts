const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 900,
		height: 680,
		webPreferences: {
			// nodeIntegration: true,
			contextIsolation: true,
			preload: path.join(__dirname, "preload.js"),
		},
	});

	mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);

	if (isDev) {
		// mainWindow.webContents.openDevTools();
	}

	mainWindow.on("closed", () => (mainWindow = null));

	ipcMain.on("print-label", (event, labelText) => {
		// You could potentially create a new BrowserWindow off-screen
		// to render the label for printing, or use the mainWindow
		const printWindow = new BrowserWindow({ show: false });
		printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURI("<div>" + labelText + "</div>")}`);

		printWindow.webContents.on("did-finish-load", () => {
			printWindow.webContents.print({}, (success, errorType) => {
				if (!success) {
					console.log(`Failed to print with error: ${errorType}`);
				}
				printWindow.close();
			});
		});
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
