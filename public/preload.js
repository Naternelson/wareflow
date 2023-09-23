const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
	send: ipcRenderer.send,
	on: (channel, func) => {
		// Deliberately strip event as it includes `sender`
		const newFunc = (event, ...args) => func(...args);
		ipcRenderer.on(channel, newFunc);
		return newFunc; // Return the newly created function
	},
	off: (channel, func) => {
		ipcRenderer.removeListener(channel, func);
	},
});
