import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";

export interface PrinterMessage {
    id: string, 
    status: "pending" | "success" | "error",
    printer: string,
    errorType?: string
}

const initialState: PrinterMessage[] = [];

const reducers = {
    updateMessage: (state: PrinterMessage[], action: PayloadAction<PrinterMessage>) => {
        const {id} = action.payload;
        const index = state.findIndex((message) => message.id === id);
        if(index !== -1) state[index] = action.payload;
        else state.push(action.payload);
    },
    removeMessage: (state: PrinterMessage[], action: PayloadAction<string>) => {
        const id= action.payload;
        const index = state.findIndex((message) => message.id === id);
        if(index !== -1) state.splice(index, 1);
    }
}

const slice = createSlice({
    name: "printer",
    initialState,
    reducers
})
export const {updateMessage, removeMessage} = slice.actions;
export default slice.reducer;

export const selectPrinterMessages = (state: AppState) => state.printer;