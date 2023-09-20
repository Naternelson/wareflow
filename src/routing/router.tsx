import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { ErrorView, RootView } from "../views";
const router = createBrowserRouter([{
    path: "/",
    element: <RootView/>,
    errorElement: <ErrorView/>
}])

export default router;