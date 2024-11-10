// import {
//   createBrowserRouter,
//   RouterProvider,
//   Navigate,
//   Outlet,
// } from "react-router-dom";
// import Account from "./pages/Account";
// import Dashboard from "./pages/Dashboard"; // Example additional protected route
// import Settings from "./pages/Settings"; // Another example protected route
// import Home from "./pages/Home";
// import PropTypes from "prop-types";

// // ProtectedLayout component
// function ProtectedLayout({ isAuthenticated, redirectPath = "/login" }) {
//   if (!isAuthenticated) {
//     return <Navigate to={redirectPath} replace />;
//   }
//   return <Outlet />;
// }

// ProtectedLayout.propTypes = {
//   isAuthenticated: PropTypes.bool.isRequired,
//   redirectPath: PropTypes.string,
// };

// // Mock authentication status
// const isAuthenticated = false; // Replace this with actual authentication logic

// // Router configuration
// const routers = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/login",
//     element: <div>Login Page</div>, // Replace with actual login component
//   },
//   {
//     path: "/",
//     element: <ProtectedLayout isAuthenticated={isAuthenticated} />,
//     children: [
//       { path: "/account", element: <Account /> },
//       { path: "/dashboard", element: <Dashboard /> },
//       { path: "/settings", element: <Settings /> },
//       // Add more protected routes here as needed
//     ],
//   },
// ]);

// // Main App component
// export default function App() {
//   return (
//     <div>
//       <nav>
//         <a href="/">Home</a>
//         <a href="/account">Account</a>
//         <a href="/dashboard">Dashboard</a>
//         <a href="/settings">Settings</a>
//       </nav>
//       <RouterProvider router={routers} />
//     </div>
//   );
// }

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home.jsx";
import Account from "@/pages/Account.jsx";
import Login from "@/features/auth/LoginPage.jsx";
import ProtectedRoute from "@/components/ProtectedRoute.jsx";

const isAuthenticated = false;

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Home />
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
    children: [
      { path: "/account", element: <Account /> },
      // Add more protected routes here as needed
    ],
  },
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={routers} />
    </div>
  );
}
