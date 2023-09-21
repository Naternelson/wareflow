import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root";
import printerReducer from "./printer";

const store = configureStore({
	reducer: {
		root: rootReducer,
		printer: printerReducer
	},
});

export type AppState = ReturnType<typeof store.getState>;
export default store;
