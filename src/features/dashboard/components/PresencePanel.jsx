'use client';

import { usePresenceStore } from '@/shared/store/presenceStore';
import { MOCK_AGENTS } from '@/shared/constants/mockData';
import Avatar from '@/shared/components/ui/Avatar';
import Badge from '@/shared/components/ui/Badge';
import { Users } from 'lucide-react';

export default function PresencePanel() {
  const onlineAgents = MOCK_AGENTS; // Replace with usePresenceStore().onlineAgents

  // Sort: online first, editing, idle, away, offline
  const sortedAgents = [...onlineAgents].sort((a, b) => {
    const order = { editing: 1, online: 2, idle: 3, away: 4, offline: 5 };
    return order[a.status] - order[b.status];
  });

  return (
    <div className="flex-1 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col min-h-0 overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
        <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Users size={16} className="text-blue-500" />
          Active Team
        </h3>
        <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
          {onlineAgents.filter(a => a.status !== 'offline').length} Online
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {sortedAgents.map((agent) => (
          <div key={agent.id} className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors group cursor-default">
            <div className="flex items-center gap-3">
              <Avatar name={agent.name} size="sm" showPresence presenceStatus={agent.status} />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900 dark:text-white leading-none">
                  {agent.name}
                </span>
                <span className="text-xs text-slate-500 mt-1 leading-none truncate max-w-[120px]">
                  {agent.role}
                </span>
              </div>
            </div>
            
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
               <Badge variant="presence" value={agent.status} size="sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
