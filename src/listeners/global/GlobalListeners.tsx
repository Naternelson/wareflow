import { PropsWithChildren } from "react";
import usePrinterListener from "../printer";

const GlobalListeners = (props: PropsWithChildren) => {
    usePrinterListener()
	return <>{props.children}</>;
};


export default GlobalListeners;