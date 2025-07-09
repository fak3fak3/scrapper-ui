import React from "react";
import ReactDOM from "react-dom/client";
// App.tsx (или index.tsx)
import { HydratedRouter } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router";
import { router } from "./routes";
import "./styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
