import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import { authService } from "@/services/authService";
import VerifyEmailPage from "@/features/auth/VerifyEmailPage";

export default function Home() {
  const { isAuthenticated, user } = authService();
  const isVerified = user?.isVerified;

  return (
    <div>
      {isAuthenticated ? (
        <>{isVerified ? <AuthLayout /> : <VerifyEmailPage />}</>
      ) : (
        <MainLayout />
      )}
    </div>
  );
}
