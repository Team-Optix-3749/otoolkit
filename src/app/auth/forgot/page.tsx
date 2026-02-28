"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useNavbar } from "@/hooks/useNavbar";
import { resetPassword } from "@/lib/supabase/auth";
import { ForgotPasswordStates, stateToMessage } from "@/lib/types/states";
import { logger } from "@/lib/logger";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPassword() {
  const { setVariant, setDefaultExpanded, resetNavbar } = useNavbar();
  const isHydrated = useIsMounted();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.loading("Sending reset link ...", { id: "forgotPasswordToast" });

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString();

    if (!email) {
      toast.error("Please enter your email.", { id: "forgotPasswordToast" });
      return;
    }

    const state = await resetPassword(email);

    switch (state) {
      case ForgotPasswordStates.SUCCESS:
        toast.success("Reset link sent! Check your inbox.", {
          id: "forgotPasswordToast"
        });
        logger.info({ email }, "Password reset email sent");
        setSubmitted(true);
        break;
      default:
        toast.error(stateToMessage(state), {
          id: "forgotPasswordToast"
        });
        break;
    }
  };

  useEffect(() => {
    setVariant("minimal");
    setDefaultExpanded(false);

    return () => {
      resetNavbar();
    };
  }, [setDefaultExpanded, setVariant, resetNavbar]);

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-6">
          <Card className="bg-card/80 backdrop-blur-xl border border-border shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-foreground">
                {submitted ? "Check your email" : "Forgot your password?"}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {submitted
                  ? "We've sent a password reset link to your email address."
                  : "Enter your email and we'll send you a reset link."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {submitted ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-center text-sm text-muted-foreground">
                      Didn&apos;t receive the email? Check your spam folder or
                      try again.
                    </p>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setSubmitted(false)}>
                      Try again
                    </Button>
                  </div>
                ) : isHydrated ? (
                  <form className="grid gap-6" onSubmit={handleSubmit}>
                    <div className="grid gap-3">
                      <Label htmlFor="email" className="text-foreground">
                        Email
                      </Label>
                      <Input
                        name="email"
                        type="text"
                        placeholder="m@example.com"
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        autoComplete="email"
                        autoFocus
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Send Reset Link
                    </Button>
                  </form>
                ) : (
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <div className="h-4 w-10 animate-pulse rounded bg-muted" />
                      <div className="h-10 w-full animate-pulse rounded bg-muted" />
                    </div>
                    <div className="h-10 w-full animate-pulse rounded bg-muted" />
                  </div>
                )}
                <div className="text-center text-sm text-muted-foreground">
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-1 underline underline-offset-4 text-foreground hover:text-primary">
                    <ArrowLeft className="h-3 w-3" />
                    Back to Login
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
