import { Box, styled } from "@mui/material";
import { useState } from "react";
import { ProductHeader } from "./ProductHeader";
import { ProductList } from "./ProductList";
import { ProductDetails } from "./details/ProductDetails";
import { productItems } from "./mockdata";

const ProductOverviewView = () => {
	const [focus, setFocus] = useState<string | null>(null);
	const [selected, setSelected] = useState<string[]>([]);
	const onSelect = (id: string) => {
		selected.includes(id) ? setSelected(selected.filter((s) => s !== id)) : setSelected([...selected, id]);
	};
	const onFocus = (id: string) => {
		setFocus(id);
	}
	return (
		<StyledContainer>
			<StyledRow>
				<StyledColumn style={{maxWidth: "500px"}}>
					<ProductHeader />
					<ProductList focus={focus} items={productItems} selected={selected} onSelect={onSelect} onFocus={onFocus}/>
				</StyledColumn>
				<StyledColumn style={{maxWidth: "800px"}}>

					{!!focus && <ProductDetails productId={focus || ""} />}
					{!focus && <Box style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>Nothing to see here</Box>}
				</StyledColumn>
			</StyledRow>
		</StyledContainer>
	);
};

export default ProductOverviewView;

const StyledContainer = styled(Box)({
	display: "flex",
	flexDirection: "column",
	height: "100%",
	width: "100%",
	overflow: "hidden",
	padding: "1rem",
	boxSizing: "border-box",
});

const StyledRow = styled(Box)({
	display: "flex",
	flexDirection: "row",
	width: "100%",
	overflow: "hidden",
	boxSizing: "border-box",
	justifyContent: "center",
	gap: "5rem",
});

const StyledColumn = styled(Box)({
	display: "flex",
	flexDirection: "column",
	boxSizing: "border-box",
	flex: 1,
});
