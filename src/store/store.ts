import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root";
import printerReducer from "./printer";
import productReducer from "./products";

const store = configureStore({
	reducer: {
		root: rootReducer,
		printer: printerReducer,
		products: productReducer,
	},
});

export type AppState = ReturnType<typeof store.getState>;
export default store;
