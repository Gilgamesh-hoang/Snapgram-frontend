import "./globals.css";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import {Route, Routes} from "react-router-dom";
import {Toaster} from "@/components/ui/toast/toaster.tsx";
import {privateRoutes, publicRoutes, RouteType} from "@/route";

const App = () => {

    const routeRender = (route: RouteType) => (
        <Route
            key={route.path}
            path={route.path}
            element={<route.element/>}
            index={route.index}
        />
    );

    return (
        <main className="flex h-screen">
            <Routes>
                {/* public routes */}
                <Route element={<AuthLayout/>}>
                    {
                        publicRoutes.map((routeObject) =>
                            routeRender(routeObject)
                        )
                    }

                </Route>

                {/* private routes */}
                <Route element={<RootLayout/>}>
                    {
                        privateRoutes.map((routeObject) =>
                            routeRender(routeObject)
                        )
                    }
                </Route>
            </Routes>
            <Toaster/>
        </main>
    )
};

export default App;