'use client';

import { useActivityStore } from '@/features/activity/store/activityStore';
import { MOCK_ACTIVITIES } from '@/shared/constants/mockData';
import { formatRelativeTime } from '@/shared/utils';
import { Activity, Lock, Unlock, FilePlus, MessageSquare, AlertCircle, RefreshCw, LogIn } from 'lucide-react';

const iconMap = {
  ticket_locked: Lock,
  ticket_unlocked: Unlock,
  ticket_created: FilePlus,
  ticket_resolved: RefreshCw,
  comment_added: MessageSquare,
  priority_changed: AlertCircle,
  status_changed: RefreshCw,
  agent_joined: LogIn,
  attachment_uploaded: FilePlus,
};

import { useUIStore } from '@/shared/store/uiStore';
import Drawer from '@/shared/components/ui/Drawer';

export default function LiveActivityPanel() {
  const activities = MOCK_ACTIVITIES; // Replace with useActivityStore().activities
  const { isActivityDrawerOpen, setActivityDrawerOpen } = useUIStore();

  const content = (
    <div className="flex flex-col h-full overflow-hidden bg-white dark:bg-slate-900 rounded-xl lg:rounded-none shadow-sm lg:shadow-none border border-slate-200 dark:border-slate-800 lg:border-none min-w-0">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
        <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Activity size={16} className="text-blue-500" />
          Live Activity
        </h3>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activities.map((activity, index) => {
          const Icon = iconMap[activity.event_type] || Activity;
          return (
            <div key={activity.id} className="relative flex gap-3">
              {/* Connector line */}
              {index !== activities.length - 1 && (
                <div className="absolute left-3.5 top-8 bottom-[-16px] w-px bg-slate-200 dark:bg-slate-800" />
              )}
              
              <div className="relative z-10 flex-shrink-0 w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-white dark:border-slate-900">
                <Icon size={12} className="text-slate-500 dark:text-slate-400" />
              </div>
              
              <div className="flex-1 pb-1">
                <div className="text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-semibold text-slate-900 dark:text-white mr-1">
                    {activity.agent_name}
                  </span>
                  {activity.description.replace(activity.agent_name, '').trim()}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {formatRelativeTime(activity.created_at)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Grid Layout */}
      <div className="hidden lg:flex flex-col h-full w-full border-l border-slate-200 dark:border-slate-800 overflow-hidden">
        {content}
      </div>

      {/* Tablet/Mobile Drawer Layout */}
      <div className="lg:hidden">
        <Drawer 
          isOpen={isActivityDrawerOpen} 
          onClose={() => setActivityDrawerOpen(false)} 
          title="Live Activity"
          width="w-[320px] max-w-[90vw]"
        >
          {content}
        </Drawer>
      </div>
    </>
  );
}
