import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import { authService } from "@/services/authService";
import Account from "./Account";
export default function Home() {
  const { isAuthenticated } = authService();
  return (
    <div>
      <p>
        {isAuthenticated ? (
          <AuthLayout>
            <Account />
          </AuthLayout>
        ) : (
          <MainLayout />
        )}
      </p>
    </div>
  );
}
