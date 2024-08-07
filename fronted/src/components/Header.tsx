import { Link } from "@tanstack/react-router"
import { Navigation } from "./Navigation"

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link href="#" className="flex items-center justify-center">
        <CookingPotIcon className="h-6 w-6" />
        <span className="sr-only">Cullinary</span>
      </Link>
      <Navigation />
    </header>
  )
}

export interface IconProps extends React.SVGProps<SVGSVGElement> {}

function CookingPotIcon(props: IconProps) {
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
      <title>Cooking Pot Icon</title>
      <path d="M2 12h20" />
      <path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
      <path d="m4 8 16-4" />
      <path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8" />
    </svg>
  )
}
