import { Link, createFileRoute } from "@tanstack/react-router"
import { Loader2 } from "lucide-react"
import { type SubmitHandler, useForm } from "react-hook-form"

import type { UserCreate } from "@/client"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useAuth from "@/hooks/useAuth"

export const Route = createFileRoute("/auth/signup")({
  component: SignUpPage,
})

export default function SignUpPage() {
  const { signUpMutation } = useAuth()

  const form = useForm<UserCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      email: "",
      full_name: "",
      password: "",
      username: "",
    },
  })

  const onSubmit: SubmitHandler<UserCreate> = (data) => {
    signUpMutation.mutate(data)
  }

  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container flex justify-center items-center mx-auto px-4 md:px-6">
          <Card className="p-2 max-w-lg md:p-4 lg:p-6">
            <CardHeader>
              <CardTitle>Create your account</CardTitle>
              <CardDescription>
                Join our community of food enthusiasts.
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="full_name"
                      rules={{
                        required: {
                          value: true,
                          message: "Please enter full name",
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <div className="space-y-2">
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input
                                className={
                                  fieldState.error
                                    ? "border-red-500 ring-red-500"
                                    : ""
                                }
                                placeholder="John Doe"
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      rules={{
                        required: {
                          value: true,
                          message: "Please enter email",
                        },
                        pattern: {
                          message: "Invalid email address",
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <div className="space-y-2">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="example@cullinary.com"
                                {...field}
                                className={
                                  fieldState.error
                                    ? "border-red-500 ring-red-500"
                                    : ""
                                }
                                autoComplete="email"
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="username"
                    rules={{
                      required: {
                        value: true,
                        message: "Please enter username",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <div className="space-y-2">
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="johndoe"
                              autoComplete="username"
                              {...field}
                              className={
                                fieldState.error
                                  ? "border-red-500 ring-red-500"
                                  : ""
                              }
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
                      required: {
                        value: true,
                        message: "Please enter password",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <div className="space-y-2">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="********"
                              {...field}
                              className={
                                fieldState.error
                                  ? "border-red-500 ring-red-500"
                                  : ""
                              }
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    disabled={form.formState.isSubmitting}
                    type="submit"
                    className="w-full"
                  >
                    {form.formState.isSubmitting ? (
                      <Loader2 className="animate-ping" />
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </CardContent>
              </form>
            </Form>
            <CardFooter>
              <div className="text-center w-full">
                Already have an account? <Link to={"/auth/login"}>Log In</Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
