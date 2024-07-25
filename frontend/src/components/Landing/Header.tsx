import { BookmarkIcon } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground border-b flex items-center justify-between px-4 sm:px-6 h-16">
      <div className="flex items-center gap-2">
        <BookmarkIcon className="w-6 h-6" />
        <span className="text-lg font-bold">Culinary</span>
      </div>
    </header>
  );
}
