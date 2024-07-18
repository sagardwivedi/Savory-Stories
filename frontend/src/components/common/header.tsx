import { BookmarkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground border-b flex items-center justify-between px-4 sm:px-6 h-16">
      <Link to="/" className="flex items-center gap-2">
        <BookmarkIcon className="w-6 h-6" />
        <span className="text-lg font-bold">Culinary</span>
      </Link>
    </header>
  );
}
