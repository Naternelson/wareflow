import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { ErrorView, HomeView, RootView } from "../views";
import Protected from "../views/protected";
import {ProductOverviewView} from "../views/products";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootView />,
		errorElement: <ErrorView />,
		children: [
			{
				path: "/",
				element: <Protected />,
				children: [
					{
						path: "home",
						element: <HomeView />,
					},
					{
						path: "orders",
						element: <div>Orders</div>,
					},
					{
						path: "products",
						element: <ProductOverviewView/>,
					},
				],
			},
		],
	},
	// Add other routes as necessary, such as '/login'.
]);

export default router;
