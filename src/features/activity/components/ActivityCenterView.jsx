'use client';

import { MOCK_ACTIVITIES } from '@/shared/constants/mockData';
import { Timeline } from '@/shared/components/ui/Timeline';

import { formatRelativeTime } from '@/shared/utils';
import { Filter } from 'lucide-react';


export default function ActivityCenterView() {
  const timelineEvents = MOCK_ACTIVITIES.map(activity => ({
    id: activity.id,
    title: activity.description,
    description: `Ticket #${activity.ticket_number} • ${activity.agent_name}`,
    time: formatRelativeTime(activity.created_at),
    icon: null, // Let the timeline use default dots
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Activity Center</h1>
          <p className="text-slate-500 dark:text-slate-400">Audit log of all actions taken across the helpdesk.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 border rounded-md">
            <Filter className="w-4 h-4" />
            Filter Events
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6 max-w-3xl">
        <Timeline events={timelineEvents} />
      </div>
    </div>
  );
}
