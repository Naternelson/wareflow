import { Box, styled } from "@mui/material";
import { SortButton } from "../../../components"
import { useState } from "react";
import { SearchBar } from "../../../components";
import { ProductHeader } from "./ProductHeader";
import { ProductList } from "./ProductList";


/**
 * Sample data, to be replaced with API calls
 */
const ProductNameOptions = ["BelleX", "Mini Guardians", "Belle BTE", "Drink Mix 1", "Drink Mix 2", "Drink Mix 3", "Drink Mix 4", "Drink Mix 5" ]
const ProductId = (index: number) => `PROD-${index}`
const CustomerNameList = (index: number) => index < 3 ? "Freeus" : "Pharmachem"
const customerId = (index: number) => index < 3 ? "CUST-1" : "CUST-2"
const variations = (index: number) => index % 3 + 1
const productItems = ProductNameOptions.map((name, index) => {
    return {
        name,
        productId: ProductId(index),
        customerName: CustomerNameList(index),
        customerId: customerId(index),
        variations: variations(index)
    }
})
const ProductOverviewView = () => {
    const [selected, setSelected] = useState<string[]>([])
    const onSelect = (id: string) => {
        selected.includes(id) ? setSelected(selected.filter(s => s !== id)) : setSelected([...selected, id])
    }
    return (
		<StyledContainer>
			<StyledRow>
				<StyledColumn>
					<ProductHeader />
                    <ProductList items={productItems} selected={selected} onSelect={onSelect}/>
				</StyledColumn>
			</StyledRow>
		</StyledContainer>
	);
}

export default ProductOverviewView;


const StyledContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    overflow: "hidden",
    padding: "1rem",
    boxSizing: "border-box"
})


const StyledRow = styled(Box)({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    overflow: "hidden",
    boxSizing: "border-box",
    justifyContent: "space-between",
    gap: "1rem"
})

const StyledColumn = styled(Box)({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    overflowY: "hidden",
    boxSizing: "border-box",
    
})

