import { Add } from "@mui/icons-material";
import { Box, Button, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router";
import { SearchBar, SortButton } from "../../../components";
import { useState } from "react";

const sortOptions = [
    { label: "From Most Ordered", value: "order-count-down" },
    { label: "From Least Ordered", value: "order-count-up" },
    { label: "From A-Z (Name)", value: "a-z" },
    { label: "From Z-A (Name)", value: "z-a" },
]

export const ProductHeader = () => {
    const [currentValue, setCurrentValue] = useState("order-count-down")
    const onChangeHandler = (value: string) => {
        setCurrentValue(value)
    }
    const value = sortOptions.find(o => o.value === currentValue)?.label || sortOptions[0].label
    const nav = useNavigate()
    const onClickHandler = () => {
        nav("/products/new")
    }
	return (
		<StyledContainer>
			<StyledRow>
				<Typography variant="h6">Product Overview</Typography>
                <Button variant="contained" color="primary" size={"small"} onClick={onClickHandler} startIcon={<Add/>}>New Product</Button>
			</StyledRow>
            <SearchBar fullWidth/>
            <SortButton options={sortOptions} value={currentValue} onChange={onChangeHandler}/>
		</StyledContainer>
	);
};

const StyledContainer = styled(Box)(() => ({
	display: "flex",
	flexDirection: "column",
	padding: "1rem",
	boxSizing: "border-box",
    gap: "1rem"
}));

const StyledRow = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    overflow: "hidden",
    boxSizing: "border-box",
    justifyContent: "space-between",
    alignItems: "top",
    gap: "1rem",
}));