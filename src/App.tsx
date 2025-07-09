import React, { useEffect } from "react";
import "./App.css";
import "./styles/globals.css";

import { Links, Meta, Scripts, Outlet, ScrollRestoration } from "react-router";
import { Container, MantineProvider, Space, Stack } from "@mantine/core";
import { useUnit } from "effector-react";

function App() {
    return (
        <MantineProvider>
            <Container fluid p={0}>
                <Outlet />
            </Container>
        </MantineProvider>
    );
}

export default App;
