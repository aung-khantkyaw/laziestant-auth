import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import Newfeed from "./Newfeed";

const isAuthenticated = false;
export default function Home() {
  return (
    <div>
      <p>
        {isAuthenticated ? (
          <AuthLayout>
            <Newfeed />
          </AuthLayout>
        ) : (
          <MainLayout />
        )}
      </p>
    </div>
  );
}
