// in a declarations.d.ts file or similar
declare global {
  interface Window {
    electron: {
      send: (channel: string, ...args: any[]) => void;
      on: (channel: string, func: (...args: any[]) => void) => (...args: any[]) => void;
      off: (channel: string, func: (...args: any[]) => void) => void;
    };
  }
}
