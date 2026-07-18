import { useEffect } from 'react';
import { supabase } from '@/shared/lib/supabase/client';
import { useConnectionStore } from '@/shared/store/connectionStore';

/**
 * Hook to track Supabase Realtime connection status.
 * It subscribes to a generic system channel to monitor WebSocket connectivity
 * and updates the global connection store accordingly.
 */
export function useConnection() {
  const { setConnected, setDisconnected, setReconnecting } = useConnectionStore();

  useEffect(() => {
    // Create a generic channel to track connection status
    const channel = supabase.channel('system_connection_status');

    channel.subscribe((status, err) => {
      switch (status) {
        case 'SUBSCRIBED':
          // Successfully connected to Supabase Realtime
          setConnected();
          break;
        case 'TIMED_OUT':
        case 'CHANNEL_ERROR':
          // Connection issue, Realtime client will attempt to auto-reconnect
          setReconnecting(1);
          break;
        case 'CLOSED':
          // Connection intentionally closed or permanently disconnected
          setDisconnected(err || new Error('Connection closed'));
          break;
        default:
          break;
      }
    });

    return () => {
      // Clean up the channel on unmount
      supabase.removeChannel(channel);
    };
  }, [setConnected, setDisconnected, setReconnecting]);
}
