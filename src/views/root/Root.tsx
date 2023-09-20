import { Outlet } from "react-router-dom";

const RootView = () => {
    return (
		<div>
			<h1>Hello World This is the Root View</h1>
            <Outlet/>
		</div>
	);
}

export default RootView;