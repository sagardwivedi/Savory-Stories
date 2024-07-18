import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <main className="flex min-h-dvh">
      <Outlet />
    </main>
  );
}
