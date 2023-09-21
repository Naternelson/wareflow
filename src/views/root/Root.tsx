import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RootView = () => {
	const nav = useNavigate();
	const location = useLocation()
	useEffect(() => {
		if(location.pathname === "/") nav("/home");
	}, [nav, location.pathname]);
	return <Outlet/>;
};


export default RootView;
