import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import Home from "@/pages/Home.jsx";
import Account from "@/pages/Account.jsx";
import Login from "@/features/auth/LoginPage.jsx";
import Register from "@/features/auth/RegisterPage.jsx";
import ProtectedRoute from "@/components/ProtectedRoute.jsx";
import { authService } from "@/services/authService"; // Assuming you're using Zustand's useStore hook
import Loading from "@/components/ui/loading";
import Profile from "./pages/Profile";
import ForgotPasswordPage from "./features/auth/ForgotPasswordPage";
import ResetPasswordPage from "./features/auth/ResetPasswordPage";

function App() {
  const { isAuthenticated, isLoading, isCheckingAuth, loadAuthState } =
    authService();

  useEffect(() => {
    loadAuthState();
  }, [loadAuthState]);

  if (isLoading || isCheckingAuth) {
    return <Loading />;
  }

  const routers = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPasswordPage />,
    },
    {
      path: "/reset-password/:token",
      element: <ResetPasswordPage />,
    },
    {
      path: "/",
      element: <ProtectedRoute isAuthenticated={isAuthenticated} />,
      children: [
        { path: "/account", element: <Account /> },
        { path: "/:username", element: <Profile /> },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={routers} />
    </div>
  );
}

export default App;
