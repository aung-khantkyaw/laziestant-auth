import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "@/services/authService";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

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

export default function ChangePasswordPage() {
  const { user, updatePassword, successType, errorType, errorMessage } =
    authService();
  const { toast } = useToast();

  const username = user.username;

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
    if (successType === "updated-password") {
      toast({
        title: "Password Updated",
        description: "Your password has been updated successfully.",
      });
    }
  }, [successType, toast]);

  return (
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
  );
}
