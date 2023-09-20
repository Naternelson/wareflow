import { Box, Button } from "@mui/material";
import MainNavigationBar from "../../components/navigation/main/MainNavigationBar";

const RootView = () => {
    return (
		<Box>
			<MainNavigationBar/>
			<PrintButton labelText="Hello World!"/>
		</Box>
	);
}

const PrintButton = (props:{labelText:string}) => {
	const handlePrint = () => {
		console.log({window, require: window.electron})
		window.electron.send("print-label", props.labelText);
	}
	return <Button onClick={handlePrint}>Print Label</Button>
}

export default RootView;