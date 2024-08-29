import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.tsx";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "@/context/AuthContext.tsx";
import {PrimeReactProvider} from "primereact/api";

const rootElement = document.getElementById("root");

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        // <React.StrictMode>

        <BrowserRouter>
            <AuthProvider>
                <PrimeReactProvider>
                    <App/>
                </PrimeReactProvider>
            </AuthProvider>
        </BrowserRouter>

        // </React.StrictMode>
    );
} else {
    console.error("Root element not found");
}