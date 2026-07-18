import { useEffect } from 'react';
import { supabase } from '@/shared/lib/supabase/client';

/**
 * Hook to send periodic updates for lock alive status.
 * Keeps an active session/lock alive on a specific record (e.g., a ticket) 
 * while the user is actively editing or interacting with it.
 * 
 * @param {string} resourceId - The ID of the resource being locked.
 * @param {boolean} isActive - Whether the heartbeat mechanism should be running.
 * @param {number} intervalMs - Heartbeat interval in milliseconds (default 30 seconds).
 */
export function useHeartbeat(resourceId, isActive = false, intervalMs = 30000) {
  useEffect(() => {
    if (!isActive || !resourceId) return;

    const sendHeartbeat = async () => {
      try {
        // Call a Supabase RPC to update the lock's heartbeat timestamp.
        // Note: Assumes an RPC function 'keep_lock_alive' exists in your DB schema,
        // which updates the lock expiry time for the specified resource.
        const { error } = await supabase.rpc('keep_lock_alive', { p_resource_id: resourceId });
        
        if (error) {
          console.error('Failed to send heartbeat for resource:', resourceId, error);
        }
      } catch (err) {
        console.error('Unexpected error while sending heartbeat:', err);
      }
    };

    // Send an initial heartbeat immediately upon activation
    sendHeartbeat();

    // Set up the periodic interval to continually send heartbeats
    const intervalId = setInterval(sendHeartbeat, intervalMs);

    return () => {
      // Clean up the interval when deactivated or component unmounts
      clearInterval(intervalId);
    };
  }, [resourceId, isActive, intervalMs]);
}
