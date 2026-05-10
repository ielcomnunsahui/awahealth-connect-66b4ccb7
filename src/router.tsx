import { QueryClient } from "@tanstack/react-query";
import { createRouter, createBrowserHistory, createMemoryHistory } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  // Use real browser history on the client (works on Vercel, Cloudflare,
  // Lovable hosting and any custom domain because we never hard-code a base path).
  // Fall back to memory history on the server during SSR/prerender.
  const history =
    typeof window !== "undefined" ? createBrowserHistory() : createMemoryHistory();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    history,
    basepath: "/",
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
