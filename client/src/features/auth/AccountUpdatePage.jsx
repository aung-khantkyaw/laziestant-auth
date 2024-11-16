import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { authService } from "@/services/authService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import PropTypes from "prop-types";
import AvatarUploadPage from "./AvatarUploadPage";
import { Separator } from "@/components/ui/separator";

const genderSelectOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
  { label: "Prefer not to say", value: "prefer not to say" },
];

const relationshipSelectOptions = [
  { label: "Single", value: "single" },
  { label: "In a relationship", value: "in a relationship" },
  { label: "Married", value: "married" },
  { label: "It's complicated", value: "it's complicated" },
];

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z
    .string()
    .regex(/^[a-z]+$/, "Username must be lowercase letters with no spaces"),
  email: z.string().email("Please enter a valid email address"),
  bio: z.string().optional(),
  gender: z.enum(["male", "female", "other", "prefer not to say"]),
  dob: z.string(),
  address: z.string(),
  relationship: z.enum([
    "single",
    "in a relationship",
    "married",
    "it's complicated",
  ]),
  partner: z.string().optional(),
  annidate: z.string().optional(),
});
export default function AccountUpdatePage({ user }) {
  const { updateProfile, successType, errorType, errorMessage } = authService();
  const { toast } = useToast();

  console.log(successType, errorType, errorMessage);

  const accountUpdateForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      bio: "",
      gender: "prefer not to say",
      dob: "",
      address: "",
      relationship: "single",
      partner: "",
      annidate: "",
    },
  });

  const updateAccount = async (data) => {
    const {
      name,
      username,
      email,
      bio,
      gender,
      dob,
      address,
      relationship,
      partner,
      annidate,
    } = data;
    try {
      await updateProfile({
        name,
        username,
        email,
        bio,
        gender,
        dob,
        address,
        relationship,
        partner,
        annidate,
      });
    } catch (error) {
      console.error("Error changing Profile:", error);
      toast({
        title: "Error",
        description:
          error.message ||
          "There was an issue updating your profile. Please try again.",
      });
    }
  };

  // Use useEffect to handle data fetching and form reset
  useEffect(() => {
    if (user) {
      accountUpdateForm.reset({
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        gender: user.gender || "prefer not to say",
        dob: user.dob,
        address: user.address,
        relationship: user.relationship || "single",
        partner: user.partner,
        annidate: user.annidate,
      });
    }
  }, [user, accountUpdateForm]);

  useEffect(() => {
    if (successType === "updated-profile") {
      toast({
        title: "Profile Updated",
        description: "Your Profile has been updated successfully.",
      });
    }

    if (errorType === "error") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "There was an issue updating your profile. Please try again.",
      });
    }
  }, [successType, toast]);

  return (
    <Card className="max-w-4xl mx-auto mb-4">
      <CardHeader>
        <CardTitle className="text-xl">Account Settings</CardTitle>
        <CardDescription>
          Update your account information and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AvatarUploadPage />

        <Separator />
        <Form {...accountUpdateForm}>
          <form
            onSubmit={accountUpdateForm.handleSubmit(updateAccount)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={accountUpdateForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={accountUpdateForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={accountUpdateForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={accountUpdateForm.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange} // Updates form state when a value is selected
                        value={field.value} // Binds the field value to the Select component
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                        <SelectContent>
                          {genderSelectOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={accountUpdateForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={accountUpdateForm.control}
                name="relationship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relationship</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          {relationshipSelectOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={accountUpdateForm.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={accountUpdateForm.control}
                name="partner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Partner</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={accountUpdateForm.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? format(new Date(field.value), "PPP")
                              : "Pick a date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : null}
                          onSelect={(date) =>
                            field.onChange(
                              date ? date.toISOString().split("T")[0] : ""
                            )
                          }
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={accountUpdateForm.control}
                name="annidate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Anni Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? format(new Date(field.value), "PPP")
                              : "Pick a date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : null}
                          onSelect={(date) =>
                            field.onChange(
                              date ? date.toISOString().split("T")[0] : ""
                            )
                          }
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Save Change</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

AccountUpdatePage.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string,
    gender: PropTypes.string,
    dob: PropTypes.string,
    address: PropTypes.string,
    relationship: PropTypes.string,
    partner: PropTypes.string,
    annidate: PropTypes.string,
  }),
};
