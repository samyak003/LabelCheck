import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.tsx";
import Home from "./pages/Home.tsx";
import Check from "./pages/Check.tsx";
import { LoginForm } from "./pages/Login.tsx";
import { SignUpForm } from "./pages/SignUp.tsx";
import Error404 from "./pages/error404.tsx";
import { auth } from "./firebase.tsx";
import { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider.tsx";
import { Loader2 } from "lucide-react";

const links = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/check/:id",
        element: <Check />,
    },
    {
        path: "/*",
        element: <Error404 />,
    },
]

const loginPages = [
    {
        path: "/",
        element: <LoginForm />,
    },
    {
        path: "/signUp",
        element: <SignUpForm />,
    },
    {
        path: "/*",
        element: <Error404 />,
    },
]

export default function App() {
    const [{ user }, dispatch] = useStateValue();
    const [loading, setLoading] = useState<boolean>(true);
    const router = createBrowserRouter(user ? links : loginPages);

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                dispatch({
                    type: "SET_USER",
                    user: authUser,
                });
            } else {
                dispatch({
                    type: "SET_USER",
                    user: null,
                });

            }
        });
        setLoading(false)
    }, [dispatch]);


    if (loading) {
        return (
            <div className="grid w-full h-screen place-content-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </div>
        )
    }

    return <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"><RouterProvider router={router} /></ThemeProvider>;
}
