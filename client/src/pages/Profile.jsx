// import Header from "@/components/Header";
// import { authService } from "@/services/authService";
// import { formatJoinDate } from "@/lib/utils";

// export default function Profile() {
//   const { user } = authService();
//   console.log("User:", user);
//   return (
//     <div>
//       <Header page="Profile" />
//       <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
//         <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-3">
//           <h1>Account Page</h1>
//           <p>Welcome, {user?.name}</p>
//           <p>Email: {user?.email}</p>
//           <p>{formatJoinDate(user?.created)}</p>
//         </div>
//       </div>
//     </div>
//   );
// }
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, GlobeIcon, LogIn, Github } from "lucide-react";
import { authService } from "@/services/authService";
import { formatDate, lastLogin } from "@/lib/utils";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorPage from "@/components/ui/error";
import Header from "@/components/Header";

export default function Profile() {
  const { getUserData } = authService();
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      const data = await getUserData(username);
      setUser(data);
    }
    fetchProfile();
  }, [username]);

  if (!user) return <ErrorPage error="404" message="User Not Found!" />;

  return (
    <div>
      <Header page="Profile" />
      <div className="container mx-auto p-6">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="relative">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.profile} alt={user.name} />
                <AvatarFallback className="text-4xl font-bold">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription>@{user.username}</CardDescription>
                {user.isVerified && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Verified
                  </span>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="info">
              <TabsList className="mb-4">
                <TabsTrigger value="info">Info</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="info">
                <div className="grid gap-4">
                  {user.bio && (
                    <div className="grid gap-2">
                      <Label htmlFor="bio">Bio</Label>
                      <p>{user.bio}</p>
                    </div>
                  )}
                  <Separator />
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <p>{user.email}</p>
                  </div>
                  {user.gender && (
                    <div className="grid gap-2">
                      <Label htmlFor="gender">Gender</Label>
                      <p>{user.gender}</p>
                    </div>
                  )}
                  {user.dob && (
                    <div className="grid gap-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <p>{user.dob}</p>
                    </div>
                  )}
                  {user.address && (
                    <div className="grid gap-2">
                      <Label htmlFor="address">Address</Label>
                      <p>{user.address}</p>
                    </div>
                  )}
                  {user.relationship && (
                    <div className="grid gap-2">
                      <Label htmlFor="relationship">Relationship Status</Label>
                      <p>{user.relationship}</p>
                    </div>
                  )}
                  {user.link && (
                    <div className="grid gap-2">
                      <Label>Links</Label>
                      <div className="flex flex-col space-y-2">
                        {Object.entries(user.link).map(([key, url]) => (
                          <div
                            key={key}
                            className="flex items-center space-x-2"
                          >
                            {(() => {
                              switch (key) {
                                case "github":
                                  return (
                                    <Github className="w-4 h-4 text-gray-500" />
                                  );
                                case "website":
                                  return (
                                    <GlobeIcon className="w-4 h-4 text-gray-500" />
                                  );
                                default:
                                  return null;
                              }
                            })()}
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              {url}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="activity">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-4 h-4 text-gray-500" />
                    <span>Joined {formatDate(user?.created)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <LogIn className="w-4 h-4 text-gray-500" />
                    <span>Last login: {lastLogin(user?.lastLogin)}</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
