import { Sort } from "@mui/icons-material";
import { ButtonBase, Menu, MenuItem, Typography, styled } from "@mui/material";
import React from "react";

export interface SortButtonProps {
	options: { label: string; value: string }[];
	value: string;
	onChange?: (value: string) => void;
	icon?: boolean;
}

export const SortButton = (props: SortButtonProps) => {
	const { options, value, onChange, icon } = props;
	const [open, setOpen] = React.useState(false);
	const ref = React.useRef<HTMLButtonElement>(null);
    const label = options.find(o => o.value === value)?.label || ""
	return (
		<>
			<StyledButton ref={ref} onClick={() => setOpen(true)}>
				{icon !== false && <Sort fontSize="small" />}
				<Typography variant="body2">{label}</Typography>
			</StyledButton>
			<Menu anchorEl={ref.current} open={open} onClose={() => setOpen(false)}>
				{options.map((option, index) => {
					const label = typeof option === "string" ? option : option.label;
					const value = typeof option === "string" ? option : option.value;
					return (
						<MenuItemStyled
							key={index}
							selected={value === props.value}
							onClick={() => {
								setOpen(false);
								onChange?.(value);
							}}>
							{label}
						</MenuItemStyled>
					);
				})}
			</Menu>
		</>
	);
};

const StyledButton = styled(ButtonBase)(({ theme }) => ({
	display: "flex",
	flexDirection: "row",
	boxSizing: "border-box",
	justifyContent: "space-between",
	alignItems: "center",
	gap: ".5rem",
	borderRadius: "1rem",
	backgroundColor: theme.palette.common.white,
	padding: ".25rem 1rem",
    width: "fit-content",
}));

const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
	fontSize: theme.typography.body2.fontSize,
}));
