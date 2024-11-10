import { authService } from "@/services/authService";

export default function Navbar() {
  const { logout } = authService();
  return (
    <nav>
      <a href="/">Home</a>
      <a href="/account">Account</a>
      <a href="/dashboard">Dashboard</a>
      <a href="/settings">Settings</a>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
