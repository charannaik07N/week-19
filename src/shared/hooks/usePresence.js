import { useEffect } from 'react';
import { supabase } from '@/shared/lib/supabase/client';
import { usePresenceStore } from '@/shared/store/presenceStore';

/**
 * Hook to sync agent online/offline/editing state using Supabase Presence.
 * 
 * @param {string} roomId - The specific room/ticket ID to track presence in.
 * @param {object} user - The current user object containing id, name, etc.
 * @param {string} status - The current status of the user (e.g., 'online', 'editing', 'idle').
 */
export function usePresence(roomId, user, status = 'online') {
  const { syncPresence } = usePresenceStore();

  useEffect(() => {
    if (!roomId || !user?.id) return;

    // Create a Presence channel for the specific room/topic
    const channel = supabase.channel(`presence:${roomId}`, {
      config: {
        presence: {
          key: user.id, // uniquely identify the user in presence
        },
      },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        // Retrieve and sync the updated presence state to the store
        const state = channel.presenceState();
        if (syncPresence) {
          syncPresence(roomId, state);
        }
      })
      .subscribe(async (subscribeStatus) => {
        if (subscribeStatus === 'SUBSCRIBED') {
          // Track the user's initial state upon successful subscription
          await channel.track({
            user_id: user.id,
            name: user.name || 'Unknown Agent',
            status: status,
            updated_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      // Untrack presence and clean up the channel when dependencies change or component unmounts
      channel.untrack().then(() => {
        supabase.removeChannel(channel);
      });
    };
  }, [roomId, user?.id, user?.name, status, syncPresence]);
}
