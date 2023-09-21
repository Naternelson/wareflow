import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Menu, styled } from "@mui/material";
import { ReactNode, useRef, useState } from "react";
import { NavigateOptions, useNavigate } from "react-router-dom";
import { shouldForwardProp } from "@mui/system";

/**
 * `NavHeader` is a navigational header component. It supports both simple links and submenus.
 *
 * @component
 * @example
 * <NavHeader label="Home" active={true} linkTo="/home" />
 */
const NavHeader = (props: NavHeaderProps) => {
	const { label, icon, submenu, linkTo, onClick, active } = props;
	const [menuOpen, setMenuOpen] = useState(false);
	const nav = useNavigate();
	const ref = useRef(null);

	/**
	 * Handles the click event for the main container.
	 * It will navigate to a link if provided or execute the provided click handler.
	 */
	const onClickHandler = () => {
		onClick?.();
		if (typeof linkTo === "string") {
			nav(linkTo);
		} else {
			linkTo?.path && nav(linkTo.path, linkTo.options);
		}
	};

	const onArrowClickHandler = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<>
			<StyledContainer active={!!active} ref={ref}>
				<StyledClickable onClick={onClickHandler}>
					{icon}
					<StyledLabel className="menu-label">{label}</StyledLabel>
				</StyledClickable>
				{submenu && (
					<StyledArrowIcon isOpen={menuOpen} fontSize="small" color="inherit" onClick={onArrowClickHandler} />
				)}
			</StyledContainer>
			{submenu && (
				<Menu
					open={menuOpen}
					anchorEl={ref.current}
					onClose={() => setMenuOpen(false)}
					anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
					transformOrigin={{ vertical: "top", horizontal: "left" }}>
					{submenu}
				</Menu>
			)}
		</>
	);
};

export default NavHeader;

/**
 * Prop definition for the NavHeader component.
 *
 * @typedef {Object} NavHeaderProps
 * @property {string} label - The main label for the header.
 * @property {boolean} [active] - Whether the header is active.
 * @property {ReactNode} [icon] - An optional icon to display next to the label.
 * @property {ReactNode} [submenu] - Optional submenu items.
 * @property {string|Object} [linkTo] - Link for the header. Can be a string or an object with a path and navigation options.
 * @property {() => void} [onClick] - Optional click handler for additional functionality.
 */
export type NavHeaderProps = {
	label: string;
	active?: boolean;
	icon?: ReactNode;
	submenu?: ReactNode;
	linkTo?: string | { path: string; options: NavigateOptions };
	onClick?: () => void;
};

/**
 * Styled component for the label inside the header.
 */
const StyledLabel = styled("span")(({ theme }) => ({
	color: "inherit",
	fontSize: ".8rem",
	fontWeight: 600,
}));

/**
 * Styled container component for the entire header.
 */
// const StyledContainer = styled(Box)<{ active: boolean }>(({ theme, active }) => ({

// 	borderBottom: active ? `1px solid ${theme.palette.common.white}` : "1px solid rgba(0,0,0,0)",

// }));
const StyledContainer = styled(Box, {
	shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "active",
})<{ active: boolean }>(({ theme, active }) => ({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	gap: theme.spacing(1),
	padding: ".2rem .3rem",
	borderBottom: `1px solid ${active ? theme.palette.common.white : "rgba(0,0,0,0)"}`,
	transition: "color .1s ease-out",
	"&:hover": {
		color: theme.palette.primary.light,
		borderBottom: `1px solid ${active ? theme.palette.primary.light : "rgba(0,0,0,0)"}`,
	},
}));

const StyledArrowIcon = styled(KeyboardArrowDown, {
	shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "isOpen",
})<{ isOpen: boolean }>(({ isOpen }) => ({
	transition: "transform 0.2s ease-out",
	transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
	color: "white",
	cursor: "pointer",
}));

const StyledClickable = styled(Box)(({ theme }) => ({
	cursor: "pointer",
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	gap: theme.spacing(1),

}));
