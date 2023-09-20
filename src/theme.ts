import { createTheme } from "@mui/material";

const theme = createTheme({
	typography: {
		htmlFontSize: 14,
		fontSize: 12,
		fontFamily: "Inter, Roboto, sans-serif"
	},
	palette: {
		primary: {
			main: "#2996B8",
		},
		secondary: {
			main: "#3C4355"
		},
		background: {
			default: "#EFEFEF",
		}
	},
});

export default theme;
