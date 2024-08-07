import { Link } from "@tanstack/react-router"

export function Navigation() {
  return (
    <nav className="ml-auto flex gap-4 sm:gap-6">
      <Link
        href="#"
        className="text-sm font-medium hover:underline underline-offset-4"
      >
        Explore
      </Link>
      <Link
        href="#"
        className="text-sm font-medium hover:underline underline-offset-4"
      >
        Recipes
      </Link>
      <Link
        href="#"
        className="text-sm font-medium hover:underline underline-offset-4"
      >
        Community
      </Link>
      <Link
        href="#"
        className="text-sm font-medium hover:underline underline-offset-4"
      >
        About
      </Link>
    </nav>
  )
}
