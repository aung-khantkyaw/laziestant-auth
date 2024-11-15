import Header from "@/components/Header";
import ChangePasswordPage from "@/features/auth/ChangePasswordPage";
import AccountDeletePage from "@/features/auth/AccountDeletePage";
import AccountUpdatePage from "@/features/auth/AccountUpdatePage";
import AddLinkPage from "@/features/auth/AddLinkPage";
import { authService } from "@/services/authService";
import { useEffect, useState } from "react";

export default function Account() {
  const { user, getUserData } = authService();
  const [userData, setUserData] = useState();
  const username = user?.username;

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getUserData(username);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchProfile();
  }, [username]);

  return (
    <div>
      <Header page="Account" />
      <div className="container mx-auto p-6">
        <AccountUpdatePage user={userData} />

        <AddLinkPage user={userData} />

        <ChangePasswordPage />

        <AccountDeletePage />
      </div>
    </div>
  );
}
