import { Add } from "@mui/icons-material";
import { Box, Button, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router";
import { SearchBar, SortButton } from "../../../components";
import { useState } from "react";

/**
 * Temporary data for sort options available to the user.
 * @type {{label: string, value: string}[]}
 */
const sortOptions = [
	{ label: "From Most Ordered", value: "order-count-down" },
	{ label: "From Least Ordered", value: "order-count-up" },
	{ label: "From A-Z (Name)", value: "a-z" },
	{ label: "From Z-A (Name)", value: "z-a" },
];

/**
 * ProductHeader is the main header component for the product section.
 * It provides options to navigate to a new product creation page and
 * allows the user to sort the products.
 *
 * @returns {JSX.Element}
 */
export const ProductHeader = () => {
	const { currentValue, onChangeHandler, onClickHandler } = useProductHeaderHooks();
	return (
		<StyledContainer>
			<StyledRow>
				<Typography variant="h6">Product Overview</Typography>
				<Button variant="contained" color="primary" size={"small"} onClick={onClickHandler} startIcon={<Add />}>
					New Product
				</Button>
			</StyledRow>
			<SearchBar fullWidth aria-label="Search bar"/>
			<SortButton options={sortOptions} value={currentValue} onChange={onChangeHandler} aria-label={"Sort Button"} />
		</StyledContainer>
	);
};

/**
 * Custom hook to encapsulate the state and handlers
 * for the ProductHeader component.
 *
 * @returns {{
 *   currentValue: string,
 *   onChangeHandler: (value: string) => void,
 *   onClickHandler: () => void
 * }}
 */
const useProductHeaderHooks = () => {
	const [currentValue, setCurrentValue] = useState("order-count-down");

	/**
	 * Handler for changes in sort selection.
	 * @param {string} value - The selected sort option.
	 */
	const onChangeHandler = (value: string) => {
		setCurrentValue(value);
	};

	const nav = useNavigate();

	/**
	 * Handler to navigate to the new product creation page.
	 */
	const onClickHandler = () => {
		nav("/products/new");
	};
	return { currentValue, onChangeHandler, onClickHandler };
};

/**
 * Styles for the main container of the ProductHeader component.
 */
const StyledContainer = styled(Box)(() => ({
	display: "flex",
	flexDirection: "column",
	padding: "1rem",
	boxSizing: "border-box",
	gap: "1rem",
}));

/**
 * Styles for the row section of the ProductHeader component,
 * typically used to layout title and action button.
 */
const StyledRow = styled(Box)(() => ({
	display: "flex",
	flexDirection: "row",
	width: "100%",
	overflow: "hidden",
	boxSizing: "border-box",
	justifyContent: "space-between",
	alignItems: "flex-start",
	gap: "1rem",
}));
