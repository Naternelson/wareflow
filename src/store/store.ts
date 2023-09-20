import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root";

const store = configureStore({
	reducer: {
		root: rootReducer,
	},
});
export default store;
