const { contextBridge, ipcRenderer } = require("electron");
console.log("preload script executed")
contextBridge.exposeInMainWorld("electron", {
	send: ipcRenderer.send,
	on: (channel, func) => {
		// Deliberately strip event as it includes `sender`
		ipcRenderer.on(channel, (event, ...args) => func(...args));
	},
});
