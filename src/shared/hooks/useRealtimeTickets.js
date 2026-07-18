import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/shared/lib/supabase/client';
import { useTicketStore } from '@/features/tickets/store/ticketStore';

/**
 * Hook to subscribe to real-time changes on the `tickets` table.
 * It invalidates the relevant React Query caches to trigger data refetches
 * and updates local ticket store state (e.g., clearing selection if deleted).
 */
export function useRealtimeTickets() {
  const queryClient = useQueryClient();
  const { selectedTicketId, clearSelection } = useTicketStore();

  useEffect(() => {
    // Subscribe to all changes (INSERT, UPDATE, DELETE) on the tickets table in the public schema
    const channel = supabase
      .channel('public:tickets')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tickets' },
        (payload) => {
          // Invalidate the tickets query cache to prompt a background refetch
          queryClient.invalidateQueries({ queryKey: ['tickets'] });

          // If the currently selected ticket is deleted, clear the local selection state
          if (payload.eventType === 'DELETE' && payload.old?.id === selectedTicketId) {
            clearSelection();
          }
        }
      )
      .subscribe();

    return () => {
      // Clean up the realtime channel on unmount
      supabase.removeChannel(channel);
    };
  }, [queryClient, selectedTicketId, clearSelection]);
}
