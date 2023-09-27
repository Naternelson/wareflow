import { Box, Button, Typography, styled } from "@mui/material";
import { Link, isRouteErrorResponse, useLocation, useNavigate } from "react-router-dom";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
	const error = (useRouteError() as any) || {};
    const isRouteError = isRouteErrorResponse(error)
	const nav = useNavigate();
	return (
		<StyledContainer>
			<Typography variant="h1">Oops!</Typography>
			<Typography variant="body1">Our apologies, an unexpected error has occured</Typography>
			{isRouteError && (
				<>
					<Typography variant="body2" textAlign={"center"}>
						<i>{error.statusText || error.status}</i>
					</Typography>
					<Typography variant="body2" textAlign={"center"}>
						<i>{window.location.href}</i>
					</Typography>
				</>
			)}
			<Link to="/">Return to Home</Link>
			<Button variant="text" onClick={() => nav(-1)}>
				Go Back
			</Button>
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
