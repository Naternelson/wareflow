import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import isDev from "electron-is-dev";
import fs from "fs";
import child_process from "child_process";

let mainWindow:BrowserWindow | null;

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
	printLabel(labelText, true);
});

ipcMain.on("print-label-auto", (event, labelText) => {
	printLabel(labelText, false);
});

/**
 * Prints the given label text.
 *
 * @param labelText - Text to print.
 * @param showDialog - Whether or not to show the print dialog.
 */
function printLabel(labelText: string, showDialog: boolean) {
	const tempPath = path.join(__dirname, "temp_print.txt");

	fs.writeFileSync(tempPath, labelText);

	if (showDialog) {
		// The "/p" flag will open the print dialog
		child_process.exec(`notepad /p ${tempPath}`);
	} else {
		// Silently print with the default printer
		child_process.exec(`print /d:"<Your Printer Name>" ${tempPath}`, (error, stdout, stderr) => {
			if (error) {
				console.error(`print error: ${error.message}`);
				return;
			}
		});
	}

	// Optionally, clean up the temporary file after printing (you might want to delay this or check if the printing was successful)
	fs.unlinkSync(tempPath);
}