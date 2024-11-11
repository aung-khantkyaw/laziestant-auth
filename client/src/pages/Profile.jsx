import Header from "@/components/Header";
import { authService } from "@/services/authService";

export default function Profile() {
  const { user } = authService();
  return (
    <div>
      <Header page="Profile" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-3">
          <h1>Account Page</h1>
          <p>Welcome, {user?.name}</p>
        </div>
      </div>
    </div>
  );
}
