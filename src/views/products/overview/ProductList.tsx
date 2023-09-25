import { Box, BoxProps, Checkbox, List, ListItemButton, Typography, styled } from "@mui/material";

export interface ProductItem {
	name: string;
	productId: string;
	customerName: string;
	customerId: string;
	variations: number;
}

export interface ProductListProps {
	items: ProductItem[];
	selected: string[];
	onSelect: (id: string) => void;
}

export const ProductList = ({ items, selected, onSelect }: ProductListProps) => {
	return (
		<StyledList>
			{items.map((item) => {
				const isSelected = selected.includes(item.productId);
				return (
					<StyledListItemButton
						key={item.productId}
						selected={isSelected}
						onClick={() => onSelect(item.productId)}>
						<Checkbox size="small" checked={isSelected} />
						<StyledColumn grow={true} align="left">
							<Typography variant="body1" component={"h3"} fontWeight={"bold"}>
								{item.name}
							</Typography>
							<Typography variant="caption">{item.productId}</Typography>
							<Typography variant="caption">{`${item.variations} Variations`}</Typography>
						</StyledColumn>
						<StyledColumn align={"right"}>
							<Typography variant="body1" fontWeight={"bold"} >
								{item.customerName}
							</Typography>
							<Typography variant="caption">{item.customerId}</Typography>
						</StyledColumn>
					</StyledListItemButton>
				);
			})}
		</StyledList>
	);
};


const StyledColumn = styled(({ grow, align, ...otherProps }: {grow?: boolean, align?: "left" | "right"} & BoxProps) => <Box {...otherProps} />)<{
	grow?: boolean;
	align?: "left" | "right";
}>(({ grow, align }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: align === "right" ? "flex-end" : "flex-start",
	gap: ".25rem",
	flex: grow ? 1 : "unset",
    
}));

const StyledListItemButton = styled(ListItemButton)(({theme})=> ({
	gap: "0.25rem",
    backgroundColor: theme.palette.background.default,
}));

const StyledList = styled(List)({
	overflowY: "auto",
	overflowX: "hidden",
    backgroundColor: "white",
    padding: "1rem",
    gap: "2px",
    display: "flex",
    flexDirection: "column",
});
