import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import AuthLayout from "@/layouts/AuthLayout";

export default function ProtectedLayout({
  isAuthenticated,
  redirectPath = "/login",
}) {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}

ProtectedLayout.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  redirectPath: PropTypes.string,
};
