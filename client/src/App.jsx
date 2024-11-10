import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import Home from "@/pages/Home.jsx";
import Account from "@/pages/Account.jsx";
import Login from "@/features/auth/LoginPage.jsx";
import ProtectedRoute from "@/components/ProtectedRoute.jsx";
import { authService } from "@/services/authService"; // Assuming you're using Zustand's useStore hook
import Loading from "@/components/ui/loading";

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
      element: <div>Register Page</div>,
    },
    {
      path: "/",
      element: <ProtectedRoute isAuthenticated={isAuthenticated} />,
      children: [{ path: "/account", element: <Account /> }],
    },
  ]);

  return (
    <div>
      <RouterProvider router={routers} />
    </div>
  );
}

export default App;
