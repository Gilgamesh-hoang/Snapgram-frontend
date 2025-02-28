import "./globals.css";
import "primeicons/primeicons.css";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes, routes, RouteType} from "@/route";
import {useUserContext} from "@/context/AuthContext.tsx";
import {Loader} from "@/components/shared";

const Private = () => {
    const {isAuthenticated, isLoadingContext} = useUserContext();
    if (isLoadingContext) {
        return <Loader/>;
    }
    return isAuthenticated ? <Outlet/> : <Navigate to={routes.signin}/>;
};

const Public = () => {
    const {isAuthenticated, isLoadingContext} = useUserContext();
    if (isLoadingContext) {
        return <Loader/>;
    }
    return !isAuthenticated ? <Outlet/> : <Navigate to={routes.home}/>;
};

const App = () => {

    const routeRender = (route: RouteType) => {
        const ChildrenNode = route.child;
        return (
            <Route
                key={route.path}
                path={route.path}
                element={<route.element/>}
                // index={route.index}
            >
                {ChildrenNode && ChildrenNode.map((routeObject) =>
                    routeRender(routeObject)
                )}
            </Route>
        )
    };
    return (
        <main className="flex h-screen">
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route element={<RootLayout/>}>
                    {/*<Route element={<Private/>}>*/}
                        {
                            privateRoutes.map((routeObject) =>
                                routeRender(routeObject)
                            )
                        }
                    {/*</Route>*/}
                </Route>

                <Route element={<AuthLayout/>}>
                    {/*<Route element={<Public/>}>*/}
                        {
                            publicRoutes.map((routeObject) =>
                                routeRender(routeObject)
                            )
                        }
                    {/*</Route>*/}
                </Route>


            </Routes>
        </main>
    )
};

export default App;