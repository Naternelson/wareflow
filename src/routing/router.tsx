import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { RootView } from "../views";
const router = createBrowserRouter([{
    path: "/",
    element: <RootView/>
}])

export default router;