import { Link } from "react-router-dom";

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
import { useState } from "react";

const formSchema = z.object({
  username_or_email: z.string().nonempty("Please enter your username or email"),
  password: z.string().nonempty("Please enter your password"),
});

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username_or_email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success === "false") {
        setErrorMessage({
          type: json.type,
          message: json.message,
        });
        return;
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
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
                      {errorMessage.type === "username_or_email" &&
                        ` ${errorMessage.message}`}
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
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.password?.message}
                      {errorMessage.type === "password" &&
                        ` ${errorMessage.message}`}
                    </FormMessage>
                    <FormDescription>
                      <Link to="#" className="text-sm underline">
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
            <Link to="/register" className="underline">
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
