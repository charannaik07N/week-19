'use client';

import TicketQueue from '@/features/tickets/components/TicketQueue';
import TicketDetailPanel from '@/features/tickets/components/TicketDetailPanel';
import LiveActivityPanel from '@/features/activity/components/LiveActivityPanel';
import { useTicketStore } from '@/features/tickets/store/ticketStore';
import { cn } from '@/shared/utils';

export default function TicketsPage() {
  const selectedTicketId = useTicketStore((s) => s.selectedTicketId);

  return (
    <div className="h-full grid overflow-hidden bg-slate-50 dark:bg-slate-900 relative grid-cols-1 md:grid-cols-[340px_1fr] lg:grid-cols-[340px_1fr_320px] min-[1440px]:grid-cols-[380px_1fr_360px]">
      <div 
        className={cn(
          "border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden flex-col h-full min-w-0",
          selectedTicketId ? "hidden md:flex" : "flex"
        )}
      >
        <TicketQueue />
      </div>
      
      <div 
        className={cn(
          "overflow-hidden flex-col bg-slate-50 dark:bg-slate-900 h-full min-w-0",
          selectedTicketId ? "flex" : "hidden md:flex"
        )}
      >
        <TicketDetailPanel />
      </div>

      <LiveActivityPanel />
      
      {/* Mobile/Tablet Drawer Activity Panel is rendered independently inside LiveActivityPanel component */}
    </div>
  );
}
