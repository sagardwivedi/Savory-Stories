import { Toaster } from '@/components/ui/toaster';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Suspense, lazy } from 'react';

const loadDevtools = () =>
  Promise.all([
    import('@tanstack/router-devtools'),
    import('@tanstack/react-query-devtools'),
  ]).then(([routerDevtools, reactQueryDevtools]) => {
    return {
      default: () => (
        <>
          <routerDevtools.TanStackRouterDevtools />
          <reactQueryDevtools.ReactQueryDevtools />
        </>
      ),
    };
  });

const TanStackDevtools =
  process.env.NODE_ENV === 'production' ? () => null : lazy(loadDevtools);

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
      <Suspense>
        <TanStackDevtools />
      </Suspense>
    </>
  ),
});
