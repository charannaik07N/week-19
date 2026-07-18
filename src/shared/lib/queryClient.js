'use client';

import { QueryClient } from '@tanstack/react-query';

let queryClient;

export function getQueryClient() {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60, // 1 minute
          refetchOnWindowFocus: true,
          retry: 2,
        },
      },
    });
  }
  return queryClient;
}
