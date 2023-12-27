"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Creating the React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      staleTime: Infinity,
      retry: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const ReactQueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
