import { Link, useNavigate } from "react-router-dom";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authService } from "@/services/authService";
import { InputPassword } from "@/components/ui/input-password";

const formSchema = z.object({
  username_or_email: z.string().nonempty("Please enter your username or email"),
  password: z.string().nonempty("Please enter your password"),
});

export default function LoginPage() {
  const { user, login, errorMessage, errorType } = authService();

  const navigate = useNavigate();

  if (user) {
    navigate("/");
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username_or_email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const { username_or_email, password } = data;
    await login({ username_or_email, password });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username or email address and password to login to your
            account and access all the features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username_or_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username or Email Address</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.username_or_email?.message}
                      {errorType === "username_or_email" && ` ${errorMessage}`}
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
                      {form.formState.errors.password?.message}
                      {errorType === "password" && ` ${errorMessage}`}
                    </FormMessage>
                    <FormDescription>
                      <Link to="/forgot-password" className="text-sm underline">
                        Forgot your password?
                      </Link>
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-bold">
              Sign up
            </Link>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
