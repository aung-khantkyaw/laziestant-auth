import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { authService } from "@/services/authService";

const formSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function VerifyEmailPage() {
  const { verifyEmail, resendVerifyEmail, user, errorMessage, successMessage } =
    authService();
  const email = user.email;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (data) => {
    const { pin } = data;
    console.log({ pin });
    await verifyEmail({ pin });
  };

  const resendEmail = async (event) => {
    event.preventDefault();
    console.log({ email });
    await resendVerifyEmail({ email });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-lg text-center">
        <CardHeader>
          <CardTitle className="text-2xl">OTP Verification</CardTitle>
          <CardDescription>
            Enter the 6-digit verification code that was sent to {email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-lg space-y-6 text-center"
            >
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="mx-auto gap-2">
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage>{errorMessage}</FormMessage>
                  </FormItem>
                )}
              />
              <p>{successMessage}</p>
              <Button type="submit" className="min-w-full">
                Verify Email
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t reveive code?{" "}
            <Link className="font-bold" onClick={resendEmail}>
              Resend
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
