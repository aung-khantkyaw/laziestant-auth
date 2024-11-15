// import { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Separator } from "@/components/ui/separator";
// import { Textarea } from "@/components/ui/textarea";
// import { toast, useToast } from "@/hooks/use-toast";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   CalendarIcon,
//   GlobeIcon,
//   GitlabIcon as GitHubIcon,
//   LinkedinIcon,
//   TwitterIcon,
//   InstagramIcon,
//   PlusCircleIcon,
// } from "lucide-react";
// import { authService } from "@/services/authService";
// import ErrorPage from "@/components/ui/error";
// import Header from "@/components/Header";
// import { ButtonDelete } from "@/components/button-delete";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Form } from "react-router-dom";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { InputPassword } from "@/components/ui/input-password";

// const genderSelectOptions = ["male", "female", "other", "prefer not to say"];
// const relationshipSelectOptions = [
//   "single",
//   "in a relationship",
//   "married",
//   "it's complicated",
// ];

// const formSchema = z.object({
//   name: z.string(),
//   username: z
//     .string()
//     .regex(/^[a-z]+$/, "Username must be all lowercase letters with no spaces"),
//   email: z.string().email("Please enter a valid email address"),
//   profile: z.string(),
//   bio: z.string(),
//   gender: z.enum(genderSelectOptions),
//   dob: z.string(),
//   address: z.string(),
//   relationship: z.enum(relationshipSelectOptions),
//   partner: z.string(),
//   annidate: z.string(),
// });

// const passwordSchema = z
//   .object({
//     password: z
//       .string()
//       .min(8, "Password must be at least 8 characters long")
//       .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//       .regex(/[a-z]/, "Password must contain at least one lowercase letter")
//       .regex(/\d/, "Password must contain at least one number")
//       .regex(
//         /[@$!%*?&]/,
//         "Password must contain at least one special character (@$!%*?&)"
//       ),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     path: ["confirmPassword"], // Specify the path for the error message
//     message: "Passwords do not match",
//   });

// export default function Account({ username }) {
//   const { toast } = useToast();
//   const { getUserData } = authService();
//   const [user, setUser] = useState(null);
//   const [newLink, setNewLink] = useState({ type: "website", url: "" });
//   const [isAddLinkDialogOpen, setIsAddLinkDialogOpen] = useState(false);

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       username: "",
//       email: "",
//       profile: "",
//       bio: "",
//       gender: "",
//       dob: "",
//       address: "",
//       relationship: "",
//       partner: "",
//       annidate: "",
//     },
//   });

//   const changePasswordForm = useForm({
//     resolver: zodResolver(passwordSchema),
//     defaultValues: {
//       currentPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//     },
//   });

//   useEffect(() => {
//     async function fetchProfile() {
//       const data = await getUserData(username);
//       setUser(data);
//     }
//     fetchProfile();
//   }, [username]);

//   if (!user) return <ErrorPage error="404" message="User Not Found!" />;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prevUser) => ({ ...prevUser, [name]: value }));
//   };

//   const handleSelectChange = (name, value) => {
//     setUser((prevUser) => ({ ...prevUser, [name]: value }));
//   };

//   const handleNewLinkChange = (field, value) => {
//     setNewLink((prev) => ({ ...prev, [field]: value }));
//   };

//   const addNewLink = (e) => {
//     e.preventDefault();
//     console.log("New link:", newLink);
//   };

//   const changePassword = (e) => {
//     e.preventDefault();
//     console.log("Password changed");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Updated user data:", user);
//     toast({
//       title: "Account updated",
//       description: "Your account information has been updated successfully.",
//     });
//   };

//   const getLinkIcon = (type) => {
//     switch (type) {
//       case "website":
//         return <GlobeIcon className="w-4 h-4" />;
//       case "github":
//         return <GitHubIcon className="w-4 h-4" />;
//       case "linkedin":
//         return <LinkedinIcon className="w-4 h-4" />;
//       case "twitter":
//         return <TwitterIcon className="w-4 h-4" />;
//       case "instagram":
//         return <InstagramIcon className="w-4 h-4" />;
//       default:
//         return <GlobeIcon className="w-4 h-4" />;
//     }
//   };

//   return (
//     <div>
//       <Header page="Account" />
//       <div className="container mx-auto p-6">
//         <Card className="max-w-4xl mx-auto">
//           <CardHeader>
//             <CardTitle className="text-2xl">Account Settings</CardTitle>
//             <CardDescription>
//               Update your account information and preferences.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="mb-4">
//               <div className="space-y-6">
//                 <div className="flex items-center space-x-4">
//                   <Avatar className="w-24 h-24">
//                     <AvatarImage src={user.profile} alt={user.name} />
//                     <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
//                   </Avatar>
//                   <Button variant="outline">Change Avatar</Button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="name">Name</Label>
//                     <Input
//                       id="name"
//                       name="name"
//                       value={user.name}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="username">Username</Label>
//                     <Input
//                       id="username"
//                       name="username"
//                       value={user.username}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="email">Email</Label>
//                     <Input
//                       id="email"
//                       name="email"
//                       type="email"
//                       value={user.email}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="gender">Gender</Label>
//                     <Select
//                       name="gender"
//                       value={user.gender}
//                       onValueChange={(value) =>
//                         handleSelectChange("gender", value)
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select gender" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="Male">Male</SelectItem>
//                         <SelectItem value="Female">Female</SelectItem>
//                         <SelectItem value="Other">Other</SelectItem>
//                         <SelectItem value="Prefer not to say">
//                           Prefer not to say
//                         </SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="dob">Date of Birth</Label>
//                     <Input
//                       id="dob"
//                       name="dob"
//                       type="date"
//                       value={user.dob}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="relationship">Relationship Status</Label>
//                     <Select
//                       name="relationship"
//                       value={user.relationship}
//                       onValueChange={(value) =>
//                         handleSelectChange("relationship", value)
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select status" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="Single">Single</SelectItem>
//                         <SelectItem value="In a relationship">
//                           In a relationship
//                         </SelectItem>
//                         <SelectItem value="Married">Married</SelectItem>
//                         <SelectItem value="It's complicated">
//                           It's complicated
//                         </SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="address">Address</Label>
//                   <Input
//                     id="address"
//                     name="address"
//                     value={user.address}
//                     onChange={handleInputChange}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="bio">Bio</Label>
//                   <Textarea
//                     id="bio"
//                     name="bio"
//                     value={user.bio}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               </div>
//             </form>

//             <Separator />

//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(addNewLink)}
//                 className="space-y-4"
//               >
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <Label>Links</Label>
//                     <Dialog
//                       open={isAddLinkDialogOpen}
//                       onOpenChange={setIsAddLinkDialogOpen}
//                     >
//                       <DialogTrigger asChild>
//                         <Button variant="outline" size="sm">
//                           <PlusCircleIcon className="w-4 h-4 mr-2" />
//                           Add Link
//                         </Button>
//                       </DialogTrigger>
//                       <DialogContent>
//                         <DialogHeader>
//                           <DialogTitle>Add New Link</DialogTitle>
//                           <DialogDescription>
//                             Choose a link type and enter the URL.
//                           </DialogDescription>
//                         </DialogHeader>
//                         <div className="grid gap-4 py-4">
//                           <div className="grid grid-cols-4 items-center gap-4">
//                             <Label htmlFor="link-type" className="text-right">
//                               Type
//                             </Label>
//                             <Select
//                               value={newLink.type}
//                               onValueChange={(value) =>
//                                 handleNewLinkChange("type", value)
//                               }
//                             >
//                               <SelectTrigger className="col-span-3">
//                                 <SelectValue placeholder="Select link type" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 <SelectItem value="website">Website</SelectItem>
//                                 <SelectItem value="github">GitHub</SelectItem>
//                                 <SelectItem value="linkedin">
//                                   LinkedIn
//                                 </SelectItem>
//                                 <SelectItem value="twitter">Twitter</SelectItem>
//                                 <SelectItem value="instagram">
//                                   Instagram
//                                 </SelectItem>
//                               </SelectContent>
//                             </Select>
//                           </div>
//                           <div className="grid grid-cols-4 items-center gap-4">
//                             <Label htmlFor="link-url" className="text-right">
//                               URL
//                             </Label>
//                             <Input
//                               id="link-url"
//                               value={newLink.url}
//                               onChange={(e) =>
//                                 handleNewLinkChange("url", e.target.value)
//                               }
//                               className="col-span-3"
//                             />
//                           </div>
//                         </div>
//                         <DialogFooter>
//                           <Button onClick={addNewLink}>Add Link</Button>
//                         </DialogFooter>
//                       </DialogContent>
//                     </Dialog>
//                   </div>
//                   <div className="space-y-2">
//                     {user.link?.map((link, index) => (
//                       <div key={index} className="flex items-center space-x-2">
//                         {getLinkIcon(link.type)}
//                         <Input
//                           value={link.url}
//                           placeholder={`Your ${link.type} URL`}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </form>
//             </Form>

//             <Separator />

//             <Form {...changePasswordForm}>
//               <form
//                 onSubmit={form.handleSubmit(changePassword)}
//                 className="space-y-4"
//               >
//                 <div className="space-y-4 mb-4">
//                   <h3 className="text-lg font-semibold">Change Password</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       {/* <Label htmlFor="current-password">Current Password</Label>
//                       <Input id="current-password" type="password" /> */}
//                       <FormField
//                         control={changePasswordForm.control}
//                         name="password"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Current Password</FormLabel>
//                             <FormControl>
//                               <InputPassword {...field} />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="new-password">New Password</Label>
//                       <Input id="new-password" type="password" />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="confirm-password">
//                         Confirm New Password
//                       </Label>
//                       <Input id="confirm-password" type="password" />
//                     </div>
//                   </div>
//                 </div>
//                 <Button onClick={changePassword}>Change Password</Button>
//               </form>
//             </Form>

//             <Separator />

//             <div>
//               <h3 className="text-lg font-bold">Account Removal</h3>
//               <p className="mb-4">
//                 Once you delete your account, there is no going back. Please be
//                 certain.
//               </p>
//               <ButtonDelete />
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// Account.propTypes = {
//   username: PropTypes.string.isRequired,
// };

import { ButtonDelete } from "@/components/button-delete";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputPassword } from "@/components/ui/input-password";
import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "@/services/authService";
import { useEffect, useState } from "react";
import ErrorPage from "@/components/ui/error";
import { useToast } from "@/hooks/use-toast";

import { ToastAction } from "@/components/ui/toast";

const passwordSchema = z
  .object({
    currentPassword: z.string().nonempty("Please enter your current password"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@$!%*?&)"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function Account({ username }) {
  const {
    getUserData,
    updatePassword,
    successType,
    successMessage,
    errorType,
    errorMessage,
  } = authService();
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  console.log(successType, successMessage, errorType, errorMessage);

  const changePasswordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const changePassword = async (data) => {
    const { currentPassword, newPassword } = data;
    try {
      console.log("Sending data to update password:", {
        username,
        currentPassword,
        newPassword,
      });
      await updatePassword({
        username,
        currentPassword,
        newPassword,
      });

      changePasswordForm.reset();
    } catch (error) {
      console.error("Error changing password:", error);
      toast({
        title: "Error",
        description:
          error.message ||
          "There was an issue updating your password. Please try again.",
      });
    }
  };

  useEffect(() => {
    async function fetchProfile() {
      const data = await getUserData(username);
      setUser(data);
    }
    fetchProfile();
  }, [username]);

  useEffect(() => {
    if (successType === "success") {
      toast({
        title: "Password Updated",
        description: "Your password has been updated successfully.",
      });
    }
  }, [successType, toast]);

  if (!user) return <ErrorPage error="404" message="User Not Found!" />;
  return (
    <div>
      <Header page="Account" />
      <div className="container mx-auto p-6">
        <Card className="max-w-4xl mx-auto mb-4">
          <CardHeader>
            <CardTitle className="text-xl">Account Settings</CardTitle>
            <CardDescription>
              Update your account information and preferences.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="max-w-4xl mx-auto mb-4">
          <CardHeader>
            <CardTitle className="text-xl">Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...changePasswordForm}>
              <form
                onSubmit={changePasswordForm.handleSubmit(changePassword)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={changePasswordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <InputPassword {...field} />
                        </FormControl>
                        <FormMessage>
                          {errorType === "currentPassword" && errorMessage}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={changePasswordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <InputPassword {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={changePasswordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <InputPassword {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit">Change Password</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="max-w-4xl mx-auto mb-4">
          <CardHeader>
            <CardTitle className="text-xl">Account Removal</CardTitle>
            <CardDescription>
              Once you delete your account, there is no going back. Please be
              certain.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ButtonDelete />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

Account.propTypes = {
  username: PropTypes.string.isRequired,
};
