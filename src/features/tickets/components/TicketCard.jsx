'use client';

import { useTicketStore } from '@/features/tickets/store/ticketStore';
import { useAgentStore } from '@/shared/store/agentStore';
import { useNotificationStore } from '@/features/notifications/store/notificationStore';
import Badge from '@/shared/components/ui/Badge';
import Avatar from '@/shared/components/ui/Avatar';
import { formatRelativeTime, formatTicketNumber, formatSLA, cn } from '@/shared/utils';
import { Lock, Clock, MessageSquare, AlertCircle, Truck, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TicketCard({ ticket, selectionMode, isSelected, onSelectChange }) {
  const { selectedTicketId, selectTicket } = useTicketStore();
  const currentAgent = useAgentStore(s => s.currentAgent);
  const addToast = useNotificationStore(s => s.addToast);
  
  const isActive = selectedTicketId === ticket.id;
  const isLocked = ticket.locked_by !== null;
  const isLockedByMe = ticket.locked_by === currentAgent?.name;
  const isLockedByOther = isLocked && !isLockedByMe;

  const handleClick = (e) => {
    if (selectionMode) {
      e.stopPropagation();
      onSelectChange(!isSelected);
      return;
    }
    
    if (isLockedByOther) {
      addToast({ type: 'warning', title: 'Ticket Locked', message: `This ticket is currently locked by ${ticket.locked_by}` });
    }
    selectTicket(ticket.id);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      onClick={handleClick}
      className={cn(
        "w-full p-4 rounded-lg border cursor-pointer transition-all duration-150 mb-4 relative overflow-hidden flex gap-3",
        isActive 
          ? "border-blue-500 ring-1 ring-blue-500 bg-blue-50/50 dark:bg-blue-900/20" 
          : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700",
        isLockedByOther && "opacity-60 grayscale-[0.3]"
      )}
    >
      {selectionMode && (
        <div className="pt-1 flex-shrink-0 flex items-center min-h-[44px]" onClick={(e) => e.stopPropagation()}>
          <input 
            type="checkbox" 
            className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            checked={isSelected}
            onChange={(e) => onSelectChange(e.target.checked)}
          />
        </div>
      )}
      
      <div className="flex-1 min-w-0 flex flex-col min-h-[44px]">
        {/* Row 1: Ticket # + Priority + Time */}
        <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-semibold text-slate-900 dark:text-white">
              {formatTicketNumber(ticket.ticket_number)}
            </span>
            <Badge variant="priority" value={ticket.priority} size="sm" />
          </div>
          
          {isLockedByOther ? (
            <div className="flex items-center text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
              <Lock size={12} className="mr-1" />
              {ticket.locked_by}
            </div>
          ) : (
            <div className="flex items-center text-xs font-medium text-slate-500">
              <Clock size={12} className="mr-1" />
              <span className={ticket.sla_remaining <= 0 ? "text-red-600 font-bold" : ""}>
                {formatSLA(ticket.sla_remaining)}
              </span>
            </div>
          )}
        </div>

        {/* Row 2: Summary */}
        <div className="text-sm font-medium text-slate-800 dark:text-slate-200 line-clamp-2 mb-2">
          {ticket.issue}
        </div>

        {/* Row 3: Customer + Truck + Route stacked/wrapped */}
        <div className="flex flex-col gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3">
          <div className="break-words">
            {ticket.customer_name} • {ticket.company}
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            {ticket.truck_number && (
              <span className="flex items-center gap-1 whitespace-nowrap">
                <Truck size={12} /> {ticket.truck_number}
              </span>
            )}
            {ticket.location && (
              <span className="flex items-center gap-1 break-words">
                <MapPin size={12} /> {ticket.location}
              </span>
            )}
          </div>
        </div>

        {/* Bottom: Status + Assigned */}
        <div className="flex justify-between items-center mt-auto pt-1">
          <Badge variant="status" value={ticket.status} size="sm" />
          
          <div className="flex items-center gap-2 min-h-[44px]">
            {ticket.unread_count > 0 && (
              <div className="flex items-center text-xs font-medium text-blue-600 bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-md">
                <MessageSquare size={12} className="mr-1" />
                {ticket.unread_count}
              </div>
            )}
            
            {ticket.assigned_agent ? (
              <Avatar name={ticket.assigned_agent} size="sm" title={`Assigned to ${ticket.assigned_agent}`} />
            ) : (
              <div className="h-8 w-8 rounded-full border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center bg-slate-50 dark:bg-slate-800" title="Unassigned">
                <AlertCircle size={14} className="text-slate-400" />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
