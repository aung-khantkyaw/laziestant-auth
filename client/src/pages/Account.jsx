import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast, useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CalendarIcon,
  GlobeIcon,
  GitlabIcon as GitHubIcon,
  LinkedinIcon,
  TwitterIcon,
  InstagramIcon,
  PlusCircleIcon,
} from "lucide-react";
import { authService } from "@/services/authService";
import ErrorPage from "@/components/ui/error";
import Header from "@/components/Header";

export default function Account({ username }) {
  const { toast } = useToast();
  const { getUserData } = authService();
  const [user, setUser] = useState(null);
  const [newLink, setNewLink] = useState({ type: "website", url: "" });
  const [isAddLinkDialogOpen, setIsAddLinkDialogOpen] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      const data = await getUserData(username);
      setUser(data);
    }
    fetchProfile();
  }, [username]);

  if (!user) return <ErrorPage error="404" message="User Not Found!" />;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleLinkChange = (index, value) => {
    setUser((prevUser) => {
      const newLinks = [...prevUser.links];
      newLinks[index].url = value;
      return { ...prevUser, links: newLinks };
    });
  };

  const handleSelectChange = (name, value) => {
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleNewLinkChange = (field, value) => {
    setNewLink((prev) => ({ ...prev, [field]: value }));
  };

  const addNewLink = () => {
    if (newLink.url) {
      setUser((prevUser) => ({
        ...prevUser,
        links: [...prevUser.links, newLink],
      }));
      setNewLink({ type: "website", url: "" });
      setIsAddLinkDialogOpen(false);
      toast({
        title: "Link added",
        description: "Your new link has been added successfully.",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated user data:", user);
    toast({
      title: "Account updated",
      description: "Your account information has been updated successfully.",
    });
  };

  const getLinkIcon = (type) => {
    switch (type) {
      case "website":
        return <GlobeIcon className="w-4 h-4" />;
      case "github":
        return <GitHubIcon className="w-4 h-4" />;
      case "linkedin":
        return <LinkedinIcon className="w-4 h-4" />;
      case "twitter":
        return <TwitterIcon className="w-4 h-4" />;
      case "instagram":
        return <InstagramIcon className="w-4 h-4" />;
      default:
        return <GlobeIcon className="w-4 h-4" />;
    }
  };

  return (
    <div>
      <Header page="Account" />
      <div className="container mx-auto p-6">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Account Settings</CardTitle>
            <CardDescription>
              Update your account information and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user.profile} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline">Change Avatar</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={user.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      value={user.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={user.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      name="gender"
                      value={user.gender}
                      onValueChange={(value) =>
                        handleSelectChange("gender", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                        <SelectItem value="Prefer not to say">
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      name="dob"
                      type="date"
                      value={user.dob}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship Status</Label>
                    <Select
                      name="relationship"
                      value={user.relationship}
                      onValueChange={(value) =>
                        handleSelectChange("relationship", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="In a relationship">
                          In a relationship
                        </SelectItem>
                        <SelectItem value="Married">Married</SelectItem>
                        <SelectItem value="It's complicated">
                          It's complicated
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={user.address}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={user.bio}
                    onChange={handleInputChange}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Links</Label>
                    <Dialog
                      open={isAddLinkDialogOpen}
                      onOpenChange={setIsAddLinkDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <PlusCircleIcon className="w-4 h-4 mr-2" />
                          Add Link
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Link</DialogTitle>
                          <DialogDescription>
                            Choose a link type and enter the URL.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="link-type" className="text-right">
                              Type
                            </Label>
                            <Select
                              value={newLink.type}
                              onValueChange={(value) =>
                                handleNewLinkChange("type", value)
                              }
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select link type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="website">Website</SelectItem>
                                <SelectItem value="github">GitHub</SelectItem>
                                <SelectItem value="linkedin">
                                  LinkedIn
                                </SelectItem>
                                <SelectItem value="twitter">Twitter</SelectItem>
                                <SelectItem value="instagram">
                                  Instagram
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="link-url" className="text-right">
                              URL
                            </Label>
                            <Input
                              id="link-url"
                              value={newLink.url}
                              onChange={(e) =>
                                handleNewLinkChange("url", e.target.value)
                              }
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={addNewLink}>Add Link</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="space-y-2">
                    {user.link?.map((link, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        {getLinkIcon(link.type)}
                        <Input
                          value={link.url}
                          onChange={(e) =>
                            handleLinkChange(index, e.target.value)
                          }
                          placeholder={`Your ${link.type} URL`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Change Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        Confirm New Password
                      </Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                </div>
              </div>

              <CardFooter className="flex justify-between mt-6">
                <Button variant="outline" type="reset">
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
