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

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, GlobeIcon, UserIcon, Github } from "lucide-react";
import { authService } from "@/services/authService";
import { formatJoinDate } from "@/lib/utils";

export default function Profile() {
  const { user } = authService();
  const [isEditing, setIsEditing] = useState(false);
  const links = JSON.parse(user.link || "{}");
  console.log("User:", links);
  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="relative">
          <div className="absolute top-4 right-4 space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
            {isEditing && <Button>Save Changes</Button>}
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.profile} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
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
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <Textarea id="bio" defaultValue={user.bio} />
                  ) : (
                    <p>{user.bio}</p>
                  )}
                </div>
                <Separator />
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input id="email" type="email" defaultValue={user.email} />
                  ) : (
                    <p>{user.email}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="gender">Gender</Label>
                  {isEditing ? (
                    <Input id="gender" defaultValue={user.gender} />
                  ) : (
                    <p>{user.gender}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  {isEditing ? (
                    <Input
                      id="dob"
                      type="date"
                      defaultValue={user.dob.toISOString().split("T")[0]}
                    />
                  ) : (
                    <p>{user.dob}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  {isEditing ? (
                    <Input id="address" defaultValue={user.address} />
                  ) : (
                    <p>{user.address}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="relationship">Relationship Status</Label>
                  {isEditing ? (
                    <Input id="relationship" defaultValue={user.relationship} />
                  ) : (
                    <p>{user.relationship}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label>Links</Label>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <GlobeIcon className="w-4 h-4" />

                      <a
                        href={user.link?.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {user.link?.website}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Github className="w-4 h-4" />
                      <a
                        href={user.link?.Github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {user.link?.Github}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="activity">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-4 h-4 text-gray-500" />
                  <span>{formatJoinDate(user?.created)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <UserIcon className="w-4 h-4 text-gray-500" />
                  <span>Last login: {user.lastLogin.toLocaleString()}</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Change Password</Button>
          <Button variant="destructive">Delete Account</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
