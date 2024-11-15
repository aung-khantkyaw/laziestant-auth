import { Link, redirect, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authService } from "@/services/authService";

const formSchema = z.object({
  name: z.string().nonempty("Please enter your name"),
  user_name: z
    .string()
    .min(1, "Username is required")
    .regex(/^[a-z]+$/, "Username must be all lowercase letters with no spaces"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@$!%*?&)"
    ),
});

export default function RegisterPage() {
  const { user, register, errorMessage, errorType } = authService();

  const navigate = useNavigate();

  if (user) {
    navigate("/");
  }
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      user_name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const { name, user_name, email, password } = data;
    await register({ name, user_name, email, password });
    if (!errorType) {
      redirect("/verify-email");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Registration</CardTitle>
          <CardDescription>
            Enter your name, username, email address, and password to create a
            new account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage>
                      {errorType === "name" && ` ${errorMessage}`}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.username?.message}
                      {errorType === "username" && ` ${errorMessage}`}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.email?.message}
                      {errorType === "email" && ` ${errorMessage}`}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <InputPassword {...field} />
                    </FormControl>
                    <FormMessage>
                      {errorType === "password" && ` ${errorMessage}`}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="font-bold">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
