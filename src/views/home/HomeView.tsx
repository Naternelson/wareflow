import { Box, Button } from "@mui/material";
import { PropsWithChildren } from "react";

export const HomeView = () => {
	return (
		<Box>
			<PrintButton labelText="Hello World!">Print With Dialoge</PrintButton>
			<PrintButton labelText="Testing" auto >Print auto</PrintButton>
		</Box>
	);
};

const PrintButton = (props: PropsWithChildren<{ labelText: string, auto?: boolean }>) => {
	const handlePrint = () => {
		window.electron.send((props.auto ? "print-label-auto" : "print-label") , props.labelText);
	};
	return <Button onClick={handlePrint}>{props.children}</Button>;
};


export default HomeView;