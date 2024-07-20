import { HeaderApp } from '@/components/app/Header';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <main className="flex flex-col min-h-dvh">
      <HeaderApp />
      <Outlet />
    </main>
  );
}
