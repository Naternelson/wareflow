import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PrinterMessage, removeMessage, updateMessage } from "../../store/printer";

/**
 * A hook that listens to print status updates from the Electron main process.
 * If the status indicates a successful print, the corresponding message is removed after 1 second.
 * Otherwise, the message is updated in the Redux store.
 *
 * This hook should be rendered in a high-level component, such as `GlobalListeners`, for application-wide side-effects.
 */
const usePrinterListener = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const printStatusCallback = (message: any) => {
			if (!isPrinterMessage(message)) return console.error("Invalid message from printer", message);
			const { status, id } = message;
			if (status === "success")
				setTimeout(() => {
					dispatch(removeMessage(id));
				}, 1000);
			else dispatch(updateMessage(message));
		};

		return window.electron.on("print-status", printStatusCallback);
	}, [dispatch]);
};

export default usePrinterListener;

/**
 * Type guard to determine if a given object adheres to the PrinterMessage structure.
 *
 * @param obj - The object to check.
 * @returns {boolean} True if the object is a PrinterMessage; false otherwise.
 */
function isPrinterMessage(obj: any): obj is PrinterMessage {
	return (
		typeof obj === "object" &&
		obj !== null &&
		typeof obj.id === "string" &&
		typeof obj.status === "string" &&
		["pending", "success", "error"].includes(obj.status) &&
		typeof obj.printer === "string" &&
		(typeof obj.errorType === "string" || obj.errorType === undefined)
	);
}
