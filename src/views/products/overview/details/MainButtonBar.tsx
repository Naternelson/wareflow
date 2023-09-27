import { Edit } from "@mui/icons-material";
import { Box, Button, styled } from "@mui/material";
import { useNavigate } from "react-router";

export type MainButtonBarProps = {
    productId: string;
    variantId: string;
}
export const MainButtonBar = ({productId, variantId}:MainButtonBarProps) => {
    const nav = useNavigate() 
    const handleEdit = () => {
        nav(`/products/${productId}/edit`)
    }   
    const handleNewVariant = () => {
        nav(`/products/${productId}/variants/new`)
    }
    const handleNewOrder = () => {
        nav(`/orders/new?productId=${productId}&variantId=${variantId}`)
    }
	return (
		<StyledRow>
			<StyledButton onClick={handleEdit} variant="text" color={"inherit"} startIcon={<Edit fontSize="small" />} size="small">
				Edit Product
			</StyledButton>
			<StyledButton onClick={handleNewVariant} variant="text" color={"primary"} size="small">
				New Variant
			</StyledButton>
			<StyledButton onClick={handleNewOrder} variant="contained" color={"primary"} size="small">
				New Order
			</StyledButton>
		</StyledRow>
	);
};

const StyledRow = styled(Box)({
	display: "flex",
	flexDirection: "row",
	justifyContent: "center",
	alignItems: "center",
	width: "100%",
	gap: "2rem",
});

const StyledButton = styled(Button)({
	fontSize: ".7rem",

});
