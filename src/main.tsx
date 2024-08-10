import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';
import Check from './pages/Check.tsx';
import { LoginForm } from './pages/Login.tsx';
import { SignUpForm } from './pages/SignUp.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/check/:id",
    element: <Check />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/signUp",
    element: <SignUpForm />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
