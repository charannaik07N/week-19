'use client';

import { 
  Ticket, 
  Lock, 
  AlertOctagon, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { usePresenceStore } from '@/shared/store/presenceStore';
import { MOCK_TICKETS, MOCK_KPI_DATA } from '@/shared/constants/mockData';
import { cn } from '@/shared/utils';

const Sparkline = ({ trend, color }) => {
  // Simple deterministic sparkline points based on trend
  const isPositive = trend > 0;
  const strokeColor = isPositive ? '#10b981' : '#ef4444'; // emerald-500 or red-500
  const pathData = isPositive 
    ? "M 0 20 Q 10 15 20 18 T 40 10 T 60 5" 
    : "M 0 5 Q 10 10 20 8 T 40 15 T 60 20";
    
  return (
    <svg className="w-16 h-8 overflow-visible" viewBox="0 0 60 25">
      <path 
        d={pathData}
        fill="none" 
        stroke={strokeColor} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
};

function KPICard({ title, value, icon: Icon, trend, trendLabel, colorClass, highlight = false }) {
  const isPositive = trend > 0;
  const trendColor = isPositive ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-red-700 bg-red-50 border-red-200";

  return (
    <div className={cn(
      "bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-all duration-200 hover:shadow-md",
      highlight && "ring-1 ring-red-500 border-red-200"
    )}>
      <div className="flex justify-between items-start mb-4">
        <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 tracking-tight">{title}</div>
        <div className="text-slate-400">
          <Icon size={20} className={colorClass} strokeWidth={2} />
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{value}</div>
          {trend !== undefined && (
            <div className="mt-2 flex items-center gap-2">
              <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border", trendColor)}>
                {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {Math.abs(trend)}%
              </span>
              {trendLabel && <span className="text-xs text-slate-500">{trendLabel}</span>}
            </div>
          )}
        </div>
        {trend !== undefined && (
          <div className="pb-1">
            <Sparkline trend={trend} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function KPICards() {
  const onlineAgentsCount = usePresenceStore(s => s.onlineAgents.filter(a => ['online', 'editing'].includes(a.status)).length);
  
  // Real data would come from analyticsService, using mock for now
  const data = MOCK_KPI_DATA;
  const activeTicketsCount = MOCK_TICKETS.filter(t => !['resolved', 'closed'].includes(t.status)).length;
  const lockedTicketsCount = MOCK_TICKETS.filter(t => t.locked_by !== null).length;
  const criticalTicketsCount = MOCK_TICKETS.filter(t => t.priority === 'critical' && !['resolved', 'closed'].includes(t.status)).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-shrink-0">
      <KPICard title="Active Tickets" value={activeTicketsCount} icon={Ticket} colorClass="text-blue-500" trend={5} trendLabel="vs last week" />
      <KPICard title="Locked Tickets" value={lockedTicketsCount} icon={Lock} colorClass="text-amber-500" trend={-2} trendLabel="vs last week" />
      <KPICard title="Critical Tickets" value={criticalTicketsCount} icon={AlertOctagon} colorClass="text-red-500" highlight={criticalTicketsCount > 0} trend={12} trendLabel="vs last week" />
      <KPICard title="Waiting on Cust" value={data.waitingCustomer} icon={Clock} colorClass="text-orange-500" trend={-5} trendLabel="vs last week" />
      
      <KPICard title="Online Agents" value={onlineAgentsCount} icon={Users} colorClass="text-emerald-500" trend={8} trendLabel="vs last week" />
      <KPICard title="Avg Response" value={data.avgResponseTime} icon={Clock} colorClass="text-slate-500" trend={-15} trendLabel="vs last week" />
      <KPICard title="SLA Violations" value={data.slaViolations} icon={AlertTriangle} colorClass="text-red-500" trend={-10} trendLabel="vs last week" />
      <KPICard title="Resolved Today" value={data.resolvedToday} icon={CheckCircle2} colorClass="text-emerald-500" trend={24} trendLabel="vs last week" />
    </div>
  );
}
