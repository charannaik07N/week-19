'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from '@/shared/lib/queryClient';
import { ToastContainer as Toast } from '@/shared/components/ui/Toast';

import { ThemeProvider } from 'next-themes';
import CommandPaletteProvider from './CommandPaletteProvider';

export default function Providers({ children }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <CommandPaletteProvider>
          {children}
          <Toast />
        </CommandPaletteProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
