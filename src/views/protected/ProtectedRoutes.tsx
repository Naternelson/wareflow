import { Box, styled } from "@mui/material"
import { Outlet } from "react-router-dom"
import { MainNavBar } from "../../components";

const ProtectedRoutes = () => {
    return (
		<StyledContainer>
			<MainNavBar />
			<Outlet />
		</StyledContainer>
	);

}

const StyledContainer = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    padding: 0, 
    margin: 0,
    position: "relative"
}));

export default ProtectedRoutes;