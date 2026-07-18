'use client';

import TicketQueue from '@/features/tickets/components/TicketQueue';
import TicketDetailPanel from '@/features/tickets/components/TicketDetailPanel';
import LiveActivityPanel from '@/features/activity/components/LiveActivityPanel';
import { useTicketStore } from '@/features/tickets/store/ticketStore';
import { cn } from '@/shared/utils';

export default function TicketsPage() {
  const selectedTicketId = useTicketStore((s) => s.selectedTicketId);

  return (
    <div className="h-full flex overflow-hidden bg-slate-50 dark:bg-slate-900 relative">
      <div 
        className={cn(
          "flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden flex-col w-full lg:w-[360px]",
          selectedTicketId ? "hidden lg:flex" : "flex"
        )}
      >
        <TicketQueue />
      </div>
      
      <div 
        className={cn(
          "flex-1 lg:min-w-[700px] overflow-hidden flex-col bg-white dark:bg-slate-900 w-full",
          selectedTicketId ? "flex" : "hidden lg:flex"
        )}
      >
        <TicketDetailPanel />
      </div>

      <div className="hidden xl:flex w-[360px] flex-shrink-0 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden flex-col">
        <LiveActivityPanel />
      </div>
    </div>
  );
}
