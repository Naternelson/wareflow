//electron.ts

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { v4: uuidv4 } = require("uuid");

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 900,
		height: 680,
		show: false,
		webPreferences: {
			contextIsolation: true,
			preload: path.join(app.getAppPath(), "public", "preload.js"),
		},
	});
	mainWindow.once("ready-to-show", () => {
		mainWindow.maximize();
		mainWindow.show();
	});

	mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);

	if (isDev) {
		mainWindow.webContents.openDevTools();
	}

	mainWindow.on("closed", () => (mainWindow = null));
}

// function printLabel(labelText: string, event: any, options = {}) {
// 	const printWindow = new BrowserWindow({ show: false });
// 	printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURI("<div>" + labelText + "</div>")}`);
// 	console.log(encodeURI("<div>" + labelText + "</div>"));
// 	printWindow.webContents.on("did-finish-load", () => {
// 		const printers = mainWindow.webContents.getPrinters();
// 		// const defaultPrinter = printers.find((printer) => printer.isDefault);
// 		const uid = uuidv4();
// 		event.sender.send("print-status", {status: "pending", printer: defaultPrinter.name, id: uid})
// 		printWindow.webContents.print(options, (success, errorType) => {
// 			if(success) event.sender.send("print-status", {status: "success", printer: defaultPrinter.name, id: uid})
// 			else event.sender.send("print-status", {status: "error", errorType, printer: defaultPrinter.name, id: uid})
// 			printWindow.close();
// 		});
// 	});
// }

ipcMain.on("print-label", (event, labelText) => {
	// printLabel(labelText, event);
});

ipcMain.on("print-label-auto", (event, labelText) => {
	console.log("print", { labelText });
	// printLabel(labelText, event);
});

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
