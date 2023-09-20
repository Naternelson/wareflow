import { Box, Typography, styled } from "@mui/material";
import { Link, isRouteErrorResponse } from "react-router-dom";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
	const error = (useRouteError() as any) || {};
    const isRouteError = isRouteErrorResponse(error)
	console.error(error);
	return (
		<StyledContainer>
			<Typography variant="h1">Oops!</Typography>
			<Typography variant="body1">Our apologies, an unexpected error has occured</Typography>
			{isRouteError && <Typography variant="body2">
				<i>{error.statusText || error.status}</i>
			</Typography>}
			<Link to="/">Return to Home</Link>
		</StyledContainer>
	);
};

const StyledContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    height: "100vh",
}));

export default ErrorPage;
