import { AppBar, Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { selectOrganizationName, selectSiteName } from "../../../store/root";
import NavHeader from "../nav-header";
import { AllInbox, Home } from "@mui/icons-material";

const MainNavigationBar = () => {
	const siteTitle = useSelector(selectSiteName);
	const siteOrganization = useSelector(selectOrganizationName);
	return (
		<AppBar position="sticky" color="secondary">
			<StyledContainer>
				<StyledTitleLine>
					<StyledSiteTitle>{siteTitle}</StyledSiteTitle>
					<StyledOrganizationTitle>{siteOrganization}</StyledOrganizationTitle>
				</StyledTitleLine>
				<StyledMainMenus>
					<NavHeader label={"Home"} active={true} linkTo={"/home"} icon={<Home fontSize="small" />} />
					<NavHeader 
                        label={"Orders"} 
                        linkTo={"/orders"} 
                        icon={<AllInbox fontSize="small" />} 
                        submenu={<Box>Submenu</Box>}
                    />
				</StyledMainMenus>
			</StyledContainer>
		</AppBar>
	);
};
export default MainNavigationBar;

const StyledContainer = styled(Box)(() => ({
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	height: "70px",
	padding: ".5rem 1rem",
}));

const StyledTitleLine = styled(Box)(({ theme }) => ({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	gap: theme.spacing(2),
	color: "white",
}));

const StyledSiteTitle = styled("span")(() => ({
	letterSpacing: "0.2rem",
	fontSize: ".8rem",
	cursor: "default",
}));

const StyledOrganizationTitle = styled("span")(() => ({
	fontSize: "1rem",
	fontWeight: 600,
	cursor: "default",
	opacity: ".95",
}));

const StyledMainMenus = styled(Box)(({ theme }) => ({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	gap: theme.spacing(5),
}));
