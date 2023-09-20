interface Window {
	electron: {
		send: (channel: string, ...args: any[]) => void;
		on: (channel: string, listener: (...args: any[]) => void) => void;
	};
}
