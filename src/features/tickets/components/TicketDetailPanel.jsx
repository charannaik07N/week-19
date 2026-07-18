'use client';

import { useState } from 'react';
import { useTicketStore } from '@/features/tickets/store/ticketStore';
import { useAgentStore } from '@/shared/store/agentStore';
import { MOCK_TICKETS, MOCK_MESSAGES } from '@/shared/constants/mockData';
import Button from '@/shared/components/ui/Button';
import Badge from '@/shared/components/ui/Badge';
import Avatar from '@/shared/components/ui/Avatar';
import Tabs from '@/shared/components/ui/Tabs';
import EmptyState from '@/shared/components/ui/EmptyState';
import AlertBanner from '@/shared/components/ui/AlertBanner';
import { formatTicketNumber, formatDateTime } from '@/shared/utils';
import { 
  Lock, 
  Unlock, 
  FilePlus,
  Send, 
  Paperclip, 
  MoreVertical,
  MapPin,
  Truck,
  Building2,
  Phone,
  Mail,
  AlertTriangle,
  History,
  FileText,
  User,
  Package,
  Clock
} from 'lucide-react';

const TABS = [
  { label: 'Overview', value: 'overview' },
  { label: 'Conversation', value: 'messages' },
  { label: 'Internal Notes', value: 'notes' },
  { label: 'Attachments', value: 'attachments' },
  { label: 'Resolution', value: 'resolution' },
];

export default function TicketDetailPanel() {
  const { selectedTicketId, clearSelection } = useTicketStore();
  const currentAgent = useAgentStore(s => s.currentAgent);
  const [activeTab, setActiveTab] = useState('messages');
  const [replyText, setReplyText] = useState('');
  
  const ticket = MOCK_TICKETS.find(t => t.id === selectedTicketId);
  const messages = MOCK_MESSAGES.filter(m => m.ticket_id === selectedTicketId);

  if (!ticket) {
    return (
      <div className="flex-1 bg-slate-50/50 dark:bg-slate-900/20 flex flex-col items-center justify-center p-8 overflow-y-auto min-w-0">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mx-auto mb-4 border border-blue-200 dark:border-blue-800">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Ticket Selected</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Select a ticket from the queue to view its details, or use one of the quick actions below to get started.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all group">
              <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/50 mb-3 transition-colors">
                <FilePlus className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </div>
              <span className="font-medium text-slate-900 dark:text-white text-sm">Create Ticket</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all group">
              <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/50 mb-3 transition-colors">
                <AlertTriangle className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </div>
              <span className="font-medium text-slate-900 dark:text-white text-sm">View Critical</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isLocked = ticket.locked_by !== null;
  const isLockedByMe = isLocked && ticket.locked_by === currentAgent?.name;
  const isLockedByOther = isLocked && !isLockedByMe;

  const shipment = { id: 'SHP-9921', status: 'In Transit', origin: 'Dallas, TX', dest: 'Chicago, IL' };
  const driver = { name: 'John Doe', phone: '+1 555-0198', status: 'On Duty' };

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden min-w-0 relative">
      
      {/* Mobile Back Button */}
      <div className="lg:hidden p-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shrink-0">
        <Button variant="ghost" size="sm" onClick={clearSelection} className="text-slate-600 dark:text-slate-400 font-medium h-11 w-full flex justify-start items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m15 18-6-6 6-6"/></svg>
          Back to Queue
        </Button>
      </div>

      {isLockedByOther && (
        <div className="absolute inset-0 bg-slate-900/10 dark:bg-slate-900/50 backdrop-blur-[1px] z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4 text-center max-w-sm m-4">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center relative">
              <Lock size={32} className="text-blue-600 dark:text-blue-400 z-10" />
              <div className="absolute inset-0 rounded-full border-2 border-blue-500 animate-ping opacity-20"></div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Ticket Locked</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                <strong>{ticket.locked_by}</strong> is currently editing this ticket. You cannot make changes until they release the lock.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 md:p-6 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            {formatTicketNumber(ticket.ticket_number)}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="priority" value={ticket.priority} />
            <Badge variant="status" value={ticket.status} />
          </div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {ticket.issue}
          </p>
          
          {ticket.sla_remaining > 0 && ticket.sla_remaining < 3600000 && (
            <div className="flex items-center gap-1.5 text-sm font-medium text-amber-600 dark:text-amber-500">
              <Clock size={16} />
              <span>SLA Warning: {Math.floor(ticket.sla_remaining / 60000)} mins left</span>
            </div>
          )}
          {ticket.sla_remaining <= 0 && (
            <div className="flex items-center gap-1.5 text-sm font-medium text-red-600 dark:text-red-500">
              <AlertTriangle size={16} />
              <span>SLA Breached!</span>
            </div>
          )}

          <div className="flex items-center gap-2 mt-1">
            {isLockedByMe ? (
              <Button variant="danger" size="sm" icon={Unlock} className="min-h-[44px] md:min-h-[32px]">
                Release Lock
              </Button>
            ) : (
              <Button 
                variant={isLockedByOther ? 'secondary' : 'primary'} 
                size="sm" 
                icon={Lock}
                disabled={isLockedByOther}
                className="min-h-[44px] md:min-h-[32px]"
              >
                {isLockedByOther ? `Locked by ${ticket.locked_by}` : 'Lock & Edit'}
              </Button>
            )}
            <Button variant="ghost" size="icon" className="min-h-[44px] min-w-[44px] md:min-h-[32px] md:min-w-[32px]">
              <MoreVertical size={18} />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex-shrink-0">
        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30 dark:bg-slate-950/30 flex flex-col relative">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 mb-6">
            <div className="flex items-start gap-3 text-sm">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <Building2 size={18} className="text-slate-500" />
              </div>
              <div>
                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Customer</div>
                <div className="font-medium text-slate-900 dark:text-white">{ticket.customer_name}</div>
                <div className="text-slate-500 text-xs">{ticket.company}</div>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Package size={18} className="text-blue-500" />
              </div>
              <div>
                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Shipment</div>
                <div className="font-medium text-slate-900 dark:text-white">{shipment.id}</div>
                <div className="text-slate-500 text-xs">{shipment.origin} &rarr; {shipment.dest}</div>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <User size={18} className="text-amber-600" />
              </div>
              <div>
                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Driver</div>
                <div className="font-medium text-slate-900 dark:text-white">{driver.name}</div>
                <div className="text-slate-500 text-xs">{driver.phone}</div>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <Truck size={18} className="text-emerald-600" />
              </div>
              <div>
                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Truck</div>
                <div className="font-medium text-slate-900 dark:text-white font-mono">{ticket.truck_number}</div>
                <div className="text-slate-500 text-xs">{ticket.location}</div>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <MapPin size={18} className="text-purple-600" />
              </div>
              <div>
                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Route</div>
                <div className="font-medium text-slate-900 dark:text-white">{shipment.origin} &rarr; {shipment.dest}</div>
                <div className="text-slate-500 text-xs">Active Transit</div>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <AlertTriangle size={18} className="text-red-600" />
              </div>
              <div>
                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Priority</div>
                <div className="font-medium text-slate-900 dark:text-white capitalize">{ticket.priority}</div>
                <div className="text-slate-500 text-xs">SLA: {ticket.sla_remaining > 0 ? `${Math.floor(ticket.sla_remaining / 60000)} mins` : 'Breached'}</div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'messages' && (
          <div className="flex flex-col gap-6">
            {messages.length > 0 ? (
              messages.map(msg => (
                <div key={msg.id} className={`flex flex-col gap-1 max-w-[80%] ${msg.role === 'customer' ? 'self-start' : 'self-end'}`}>
                  <div className={`flex items-center gap-2 px-1 ${msg.role === 'customer' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <Avatar 
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(msg.author)}&background=random`} 
                      fallback={msg.author.charAt(0)}
                      className="w-[40px] h-[40px] rounded-full shrink-0" 
                    />
                    <div className={`flex flex-col ${msg.role === 'customer' ? 'items-start' : 'items-end'}`}>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{msg.author}</span>
                      <span className="text-xs text-slate-500">{formatDateTime(msg.created_at)}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-2xl text-sm shadow-sm border ${
                    msg.role === 'customer' 
                      ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-tl-sm' 
                      : 'bg-blue-600 border-blue-600 text-white rounded-tr-sm'
                  }`}>
                    {msg.message}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-500">
                No messages yet.
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'notes' && (
          <div className="flex flex-col gap-4">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/50 rounded-lg">
              <div className="flex justify-between text-xs mb-2 text-yellow-800 dark:text-yellow-500">
                <strong>System Note</strong>
                <span>{formatDateTime(ticket.created_at)}</span>
              </div>
              <p className="text-sm text-yellow-900 dark:text-yellow-400">Initial ticket created via driver app.</p>
            </div>
            <div className="mt-4">
              <textarea
                className="w-full min-h-[80px] rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add an internal note..."
              />
              <div className="flex justify-end mt-2">
                <Button variant="secondary" size="sm">Add Note</Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'attachments' && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex flex-col items-center justify-center gap-2 bg-white dark:bg-slate-900 text-slate-500 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <Paperclip size={24} />
              <span className="text-sm">Upload File</span>
            </div>
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex flex-col gap-2 bg-white dark:bg-slate-900">
              <FileText size={24} className="text-blue-500" />
              <span className="text-sm font-medium truncate">incident_report.pdf</span>
              <span className="text-xs text-slate-500">1.2 MB</span>
            </div>
          </div>
        )}

        {activeTab === 'resolution' && (
          <div className="max-w-2xl bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold mb-4">Resolution Form</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Root Cause</label>
                <select className="w-full min-h-[44px] rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select cause...</option>
                  <option>Mechanical Failure</option>
                  <option>Weather Delay</option>
                  <option>Customer Issue</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Resolution Summary</label>
                <textarea
                  className="w-full min-h-[100px] rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Summarize how this was resolved..."
                />
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <Button variant="secondary" className="w-full min-h-[44px]">Save Draft</Button>
                <Button variant="primary" className="w-full min-h-[44px]">Submit Resolution</Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {activeTab === 'messages' && (
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex-shrink-0 sticky bottom-0 z-10 min-h-[72px] pb-[calc(1rem+env(safe-area-inset-bottom))]">
          {isLockedByOther ? (
            <div className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg text-amber-700 dark:text-amber-500 text-sm">
              <Lock size={16} />
              <span>Editing is disabled because <strong>{ticket.locked_by}</strong> currently has this ticket locked.</span>
            </div>
          ) : !isLockedByMe ? (
            <div className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-lg text-blue-700 dark:text-blue-400 text-sm">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Lock size={16} />
                <span>You must lock this ticket before you can reply or make changes.</span>
              </div>
              <Button variant="primary" size="sm" className="w-full sm:w-auto sm:ml-auto min-h-[44px]" icon={Lock}>Lock Ticket</Button>
            </div>
          ) : (
            <div className="flex gap-2 items-end">
              <Button variant="ghost" size="icon" className="text-slate-400 min-h-[44px] min-w-[44px]">
                <Paperclip size={20} />
              </Button>
              <textarea
                className="flex-1 min-h-[44px] max-h-32 resize-y rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
                placeholder="Type your reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={1}
              />
              <Button 
                variant="primary" 
                size="icon" 
                className="min-h-[44px] min-w-[44px]"
                disabled={!replyText.trim()}
              >
                <Send size={18} />
              </Button>
            </div>
          )}
        </div>
      )}
      
      {activeTab !== 'messages' && activeTab !== 'resolution' && (
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex-shrink-0 sticky bottom-0 z-10 flex flex-col sm:flex-row justify-between items-center min-h-[72px] pb-[calc(1rem+env(safe-area-inset-bottom))] gap-3">
          <span className="text-sm text-slate-500 w-full text-center sm:text-left sm:w-auto">
            {isLockedByMe ? "You have the lock." : "Action bar"}
          </span>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
             {!isLockedByMe && !isLockedByOther && (
                <Button variant="primary" size="sm" icon={Lock} className="w-full sm:w-auto min-h-[44px]">Lock Ticket</Button>
             )}
             {isLockedByMe && (
                <Button variant="danger" size="sm" icon={Unlock} className="w-full sm:w-auto min-h-[44px]">Release Lock</Button>
             )}
          </div>
        </div>
      )}
    </div>
  );
}
