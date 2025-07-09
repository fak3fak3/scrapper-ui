import React from "react";
import { createBrowserRouter } from "react-router";
import App from "../App";
import { MainPage } from "../pages";

type NavRoute = {
    to: string;
    label: string;
};

const navRoutes: NavRoute[] = [
    {
        to: "/",
        label: "главная",
    },
];

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [{ index: true, Component: MainPage }],
    },
]);

export { navRoutes, router };
export type { NavRoute };
