import { createFileRoute, Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/Navigation"
import { Header } from "@/components/Header"

export const Route = createFileRoute("/auth/signup")({
  component: SignUpPage,
})

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container flex justify-center items-center mx-auto px-4 md:px-6">
          <Card className="p-4 max-w-lg md:p-6 lg:p-8">
            <CardHeader>
              <CardTitle>Create your account</CardTitle>
              <CardDescription>
                Join our community of food enthusiasts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@cullinary.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="johndoe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              <div>
                Already have an account? <Link to={"/auth/login"}>Log In</Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Cullinary. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
        </nav>
      </footer>
    </div>
  )
}
