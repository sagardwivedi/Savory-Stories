import { BookmarkIcon, HomeIcon, SearchIcon, User } from "lucide-react";
import { Link } from "react-router-dom";

export function HeaderApp() {
  return (
    <header className="bg-primary sticky top-0 text-primary-foreground border-b flex items-center justify-between px-4 sm:px-6 h-16">
      <Link to="/" className="flex items-center gap-2">
        <BookmarkIcon className="w-6 h-6" />
        <span className="text-lg font-bold">Culinary</span>
      </Link>
      <nav className="flex gap-4">
        <Link
          to={"/home"}
          className="flex gap-2 hover:bg-secondary/20 px-4 py-2 rounded-md"
        >
          <HomeIcon />
          <span>Home</span>
        </Link>
        <Link
          to={"explorer"}
          className="flex gap-2 hover:bg-secondary/20 px-4 py-2 rounded-md"
        >
          <SearchIcon />
          <span>Explorer</span>
        </Link>
        <Link
          to={"profile"}
          className="flex gap-2 hover:bg-secondary/20 px-4 py-2 rounded-md"
        >
          <User />
          <span>profile</span>
        </Link>
      </nav>
    </header>
  );
}
