import {
	Box,
	Breadcrumbs,
	Divider,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
	styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AnimatedBox } from "../../../../components";
import { NavLink } from "react-router-dom";
import { MainButtonBar } from "./MainButtonBar";
import { useSelector } from "react-redux";
import { selectGroupById, selectVariants } from "../../../../store/products";
import { ProgressBar } from "../../../../components/progress_bar/ProgressBar";
import { OrderSummary } from "./OrderSummary";

export const ProductDetails = (props: { productId: string }) => {
	const product = useSelector(selectGroupById(props.productId));
	const variants = useSelector(selectVariants);
	const filteredVariants = Object.values(variants).filter((v) => v.productId === props.productId);
	const [currentVariant, setCurrentVariant] = useState(filteredVariants[0]?.id || "");
	useEffect(() => {
		setCurrentVariant(filteredVariants[0]?.id || "");
	}, [props.productId]);

	return (
		<StyledColumn>
			<StyledRow>
				<Breadcrumbs separator={">"}>
					<StyledLink to="/products" end>
						Products
					</StyledLink>
				</Breadcrumbs>
			</StyledRow>
			{!props.productId && <StyledColumn>Nothing to see here</StyledColumn> }
			
			<StyledContainer data-variant={"fade-up"} key={props.productId}>
				<StyledImage src="./images/placeholder.png" alt="product" />
				<Typography variant="h5" component={"h1"} fontWeight={"bold"}>
					{product?.name}
				</Typography>
				<MainButtonBar productId={props.productId} variantId={currentVariant} />
				<Divider sx={{ width: "100%", my: "1rem" }} />

				<SelectVariant
					value={currentVariant}
					variants={filteredVariants.map((v) => ({ value: v.id, label: v.name }))}
					onSelect={setCurrentVariant}
				/>
				<ProductSpecs variantId={currentVariant} />
			</StyledContainer>
		</StyledColumn>
	);
};

const SelectVariant = (props: {
	value: string;
	variants: { value: string; label: string }[];
	onSelect: (id: string) => void;
}) => {
	return (
		<StyledFormControl fullWidth size="small">
			<InputLabel id="variant-select-label">Variant</InputLabel>
			<Select
				label="Variant"
				labelId="variant-select-label"
				variant="outlined"
				value={props.value}
				onChange={(e) => props.onSelect(e.target.value as string)}>
				{props.variants.map((v) => (
					<MenuItem dense selected={props.value === v.value} key={v.value} value={v.value}>
						{v.label}
					</MenuItem>
				))}
			</Select>
		</StyledFormControl>
	);
};

const ProductSpecs = ({ variantId }: { variantId: string }) => {
	const [progress, setProgress] = useState<number[]>(Array(5).fill(0));
	useEffect(() => {
		setProgress(
			Array(5)
				.fill(0)
				.map((_, i) => Math.floor(Math.random() * 100))
		);
	}, [variantId]);
	return (
		<SpecColumn id="spec-column">
			<SpecRow>
				<StyledTitleBox>
					<Typography variant="caption" component={"h6"} fontWeight={"bold"}>
						Properties
					</Typography>
				</StyledTitleBox>
				<Divider orientation="vertical" flexItem />
				<ValuesColumn>Properties</ValuesColumn>
			</SpecRow>
			<Divider sx={{ width: "100%", my: "1rem" }} />
			<SpecRow>
				<StyledTitleBox>
					<Typography variant="caption" component={"h6"} fontWeight={"bold"}>
						Orders
					</Typography>
				</StyledTitleBox>
				<Divider orientation="vertical" flexItem />
				<ValuesColumn>
					{progress.map((p, i) => {
						const unitCountOrdered = Math.floor(Math.random() * 100 + 10);
						const unitCountPicked = Math.floor(Math.random() * unitCountOrdered);
						return <OrderSummary
							key={`${i}-${variantId}`}
							orderId={`order-${i}`}
							status={["queued", "paused", "picking", "packing", "shipping", "delivered", "cancelled"][Math.floor(Math.random() * 7)] as any}
							createdOn={new Date().toISOString()}
							customerId={"customer-1"}
							customerName={"John Doe"}
							unitCountOrdered={unitCountOrdered}
							unitCountPicked={unitCountPicked}
						/>
					}
					)}
				</ValuesColumn>
			</SpecRow>
		</SpecColumn>
	);
};

const StyledTitleBox = styled(Box)({
	width: "5rem",
});

const ValuesColumn = styled(Box)({
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	flex: 1,
	// gap: "0.5rem",
	width: "100%"
});

const SpecRow = styled(Box)({
	display: "flex",
	flexDirection: "row",
	justifyContent: "space-between",
	alignItems: "flex-start",
	width: "100%",
	// marginBottom: "1rem",
	gap: "1rem",
});

const SpecColumn = styled(Box)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	justifyContent: "flex-start",
	alignItems: "flex-start",
	width: "100%",
	marginBottom: "1rem",
	backgroundColor: theme.palette.background.paper,
	padding: "1rem",
}));

const StyledRow = styled(Box)({
	display: "flex",
	flexDirection: "row",
	justifyContent: "flex-end",
	alignItems: "center",
	width: "100%",
});

const StyledContainer = styled(AnimatedBox)({
	display: "flex",
	flexDirection: "column",
	overflow: "auto",
	boxSizing: "border-box",
	width: "100%",
	justifyContent: "flex-start",
	alignItems: "center",
	padding: "1rem",
});

const StyledImage = styled("img")({
	height: "15rem",
	padding: "0.5rem",
	objectFit: "cover",
	objectPosition: "center",
	borderRadius: "0.5rem",
});

const StyledLink = styled(NavLink)({
	textDecoration: "inherit",
	"&.active": {
		color: "inherit",
		textDecoration: "inherit",
		cursor: "default",
	},
});

const StyledColumn = styled(Box)({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	width: "100%",
	overflowY: "hidden",
});

const StyledFormControl = styled(FormControl)(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
	marginBottom: "1rem",
}));
