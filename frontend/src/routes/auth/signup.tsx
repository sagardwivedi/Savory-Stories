import { Link, createFileRoute } from '@tanstack/react-router';
import { Loader2Icon } from 'lucide-react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import type { UserCreate } from '@/client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useAuth, { isLoggedIn } from '@/hooks/useAuth';
import {
  confirmPasswordRules,
  emailPattern,
  namePattern,
  passwordRules,
} from '@/lib/utils';
import { redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/signup')({
  component: SignupPage,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: '/',
      });
    }
  },
});

interface UserRegisterForm extends UserCreate {
  confirm_password: string;
}

function SignupPage() {
  const { signUpMutation } = useAuth();

  const form = useForm<UserRegisterForm>({
    mode: 'onBlur',
    criteriaMode: 'all',
    defaultValues: {
      email: '',
      password_hash: '',
      username: '',
      confirm_password: '',
    },
  });

  const onSubmit: SubmitHandler<UserCreate> = async (data) => {
    try {
      await signUpMutation.mutateAsync(data);
    } catch {}
  };

  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-md space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Sign Up
              </h1>
              <p className="text-muted-foreground">
                Create your Culinary account to get started.
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
                    required: 'Username is required',
                    minLength: {
                      value: 3,
                      message: 'Username must be at least 3 characters long',
                    },
                    maxLength: {
                      value: 20,
                      message:
                        'Username cannot be more than 20 characters long',
                    },
                    pattern: namePattern,
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
                  name="email"
                  rules={{
                    required: 'Email is required',
                    pattern: emailPattern,
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-2">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="example@email.com"
                            autoComplete="email"
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
                  name="password_hash"
                  rules={passwordRules()}
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
                <FormField
                  control={form.control}
                  name="confirm_password"
                  rules={confirmPasswordRules(form.getValues)}
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
                    'Sign Up'
                  )}
                </Button>
              </form>
            </Form>
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/auth/login" className="underline">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
