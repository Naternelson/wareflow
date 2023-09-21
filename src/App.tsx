import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { RouterProvider } from "react-router-dom";
import { router } from "./routing";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import GlobalListeners from "./listeners/global";

function App() {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<GlobalListeners>
					<RouterProvider router={router} />
				</GlobalListeners>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
