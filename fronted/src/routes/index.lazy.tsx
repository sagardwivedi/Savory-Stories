import { Link, createLazyFileRoute } from "@tanstack/react-router"

import { Footer } from "@/components/Footer"
import { Header, type IconProps } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const Route = createLazyFileRoute("/")({
  component: Index,
})

function Index() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 text-center text-primary-foreground">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl lg:text-7xl">
                Discover and Share Your Culinary Passions
              </h1>
              <p className="mx-auto max-w-[700px] text-xl md:text-2xl">
                Join our vibrant community of food enthusiasts and connect with
                like-minded home chefs, share your favorite recipes, and
                discover new culinary delights.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Link
                  to="/auth/signup"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Sign Up
                </Link>
                <Link className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  Explore Recipes
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary text-primary-foreground px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Share, Discover, and Connect
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Cullinary empowers you to share your culinary creations,
                  discover new recipes, and connect with a community of
                  passionate home chefs.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-start gap-2 rounded-lg bg-background p-4">
                    <UploadIcon className="h-8 w-8 text-primary" />
                    <h3 className="text-lg font-bold">Share Recipes</h3>
                    <p className="text-muted-foreground">
                      Upload your favorite recipes, complete with photos and
                      videos, to inspire others.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2 rounded-lg bg-background p-4">
                    <SearchIcon className="h-8 w-8 text-primary" />
                    <h3 className="text-lg font-bold">Discover New Dishes</h3>
                    <p className="text-muted-foreground">
                      Explore a vast collection of recipes and find new culinary
                      delights to try.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2 rounded-lg bg-background p-4">
                    <UsersIcon className="h-8 w-8 text-primary" />
                    <h3 className="text-lg font-bold">
                      Connect with the Community
                    </h3>
                    <p className="text-muted-foreground">
                      Engage with fellow home chefs, share tips, and build
                      lasting connections.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2 rounded-lg bg-background p-4">
                    <BookmarkIcon className="h-8 w-8 text-primary" />
                    <h3 className="text-lg font-bold">Save Favorite Recipes</h3>
                    <p className="text-muted-foreground">
                      Organize your culinary journey by saving your favorite
                      recipes for easy access.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 text-primary-foreground">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary text-primary-foreground px-3 py-1 text-sm">
                  Community Highlights
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Featured Recipes and Top Chefs
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore the vibrant Cullinary community and discover
                  mouthwatering recipes and talented home chefs.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-start gap-2 rounded-lg bg-background p-4">
                  <img
                    src="/images/plate-pasta-with-homemade-pesto-sauce.jpg"
                    width="300"
                    height="200"
                    alt="Recipe"
                    className="w-full rounded-lg object-cover"
                  />
                  <div className="flex items-center gap-2">
                    <div className="rounded-full w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center">
                      JD
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Homemade Pasta</h3>
                      <p className="text-sm text-muted-foreground">
                        by John Doe
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2 rounded-lg bg-background p-4">
                  <img
                    src="/images/side-view-mix-sushi-rolls-tray-with-ginger-wasabi.jpg"
                    width="300"
                    height="200"
                    alt="Recipe"
                    className="w-full rounded-lg object-cover"
                  />
                  <div className="flex items-center gap-2">
                    <div className="rounded-full w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center">
                      SA
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Sushi Rolls</h3>
                      <p className="text-sm text-muted-foreground">
                        by Sarah Anderson
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2 rounded-lg bg-background p-4">
                  <img
                    src="/images/flat-lay-gourmet-dish.jpg"
                    width="300"
                    height="200"
                    alt="Recipe"
                    className="w-full rounded-lg object-cover"
                  />
                  <div className="flex items-center gap-2">
                    <div className="rounded-full w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center">
                      MK
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Beef Stroganoff</h3>
                      <p className="text-sm text-muted-foreground">
                        by Michael Kang
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Join the Cullinary Community
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Share your culinary creations, discover new recipes, and connect
                with fellow home chefs.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="max-w-lg flex-1"
                />
                <Button type="submit">Sign Up</Button>
              </form>
              <p className="text-xs text-muted-foreground">
                Sign up to get started and unlock the full Cullinary experience.{" "}
                <Link href="#" className="underline underline-offset-2">
                  Terms &amp; Conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function BookmarkIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Bookmark Icon</title>
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  )
}

function SearchIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Search Icon</title>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function UploadIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Upload Icon</title>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}

function UsersIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Users Icon</title>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
