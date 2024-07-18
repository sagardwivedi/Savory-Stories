import { Loader2Icon } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import type { Body_auth_login_access_token as AccessToken } from "@/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import useAuth from "@/hooks/useAuth";

export default function LoginPage() {
  const { error, loginMutation } = useAuth();
  const { toast } = useToast();

  const form = useForm<AccessToken>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      password: "",
      username: "",
    },
  });

  const onSubmit: SubmitHandler<AccessToken> = async (data) => {
    try {
      await loginMutation.mutateAsync(data);
    } catch {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    }
  };

  return (
    <main className="flex-1">
      <section className="w-full py-16 md:py-28 lg:py-36 bg-background">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-md space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Login
              </h1>
              <p className="text-muted-foreground">
                Welcome back to Culinary, please login to continue.
              </p>
            </div>
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="username"
                  rules={{
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters long",
                    },
                    maxLength: {
                      value: 20,
                      message:
                        "Username cannot be more than 20 characters long",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_]*$/,
                      message:
                        "Username can only contain letters, numbers, and underscores",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-2">
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="JohnDoe"
                            autoComplete="username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    maxLength: {
                      value: 20,
                      message:
                        "Password cannot be more than 20 characters long",
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must contain at least one letter, one number, and one special character",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-2">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            autoComplete="current-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full"
                >
                  {form.formState.isSubmitting ? (
                    <Loader2Icon className="w-6 h-6" />
                  ) : (
                    "Log In"
                  )}
                </Button>
              </form>
            </Form>
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/auth/signup" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
