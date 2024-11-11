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
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authService } from "@/services/authService";
import { InputPassword } from "@/components/ui/input-password";
import { useNavigate, useParams } from "react-router-dom";

const formSchema = z.object({
  password: z.string().nonempty("Please enter your new password"),
});

export default function ResetPasswordPage() {
  const { resetPassword, errorMessage, successMessage } = authService();
  const { token } = useParams();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const { password } = data;
    await resetPassword({ password, token });
    setTimeout(() => {
      navigate("/");
    }, 5000);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter a new password for your account. Make sure it&apos;s secure,
            and confirm it below to complete the reset process.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputPassword {...field} />
                    </FormControl>
                    <FormMessage>
                      {/* {form.formState.errors.password?.message} */}
                      {errorMessage}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <p className="text-green-400">{successMessage}</p>
              <Button type="submit" className="w-full">
                Reset Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
