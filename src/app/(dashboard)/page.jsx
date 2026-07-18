import React from 'react';
import CriticalTicketsWidget from '@/features/dashboard/components/CriticalTicketsWidget';
import SlaAtRiskWidget from '@/features/dashboard/components/SlaAtRiskWidget';
import OnlineAgentsWidget from '@/features/dashboard/components/OnlineAgentsWidget';
import QueueHealthWidget from '@/features/dashboard/components/QueueHealthWidget';
import FreightAlertsWidget from '@/features/dashboard/components/FreightAlertsWidget';
import HighPriorityQueueWidget from '@/features/dashboard/components/HighPriorityQueueWidget';
import KPICards from '@/features/dashboard/components/KPICards';
import { LineChart, BarChart } from '@/shared/components/ui/Charts';

const responseTimeData = [
  { name: '10:00', response_time: 1.2 },
  { name: '11:00', response_time: 1.5 },
  { name: '12:00', response_time: 1.1 },
  { name: '13:00', response_time: 1.8 },
  { name: '14:00', response_time: 1.3 },
  { name: '15:00', response_time: 2.1 },
];

const slaData = [
  { name: 'Mon', success_rate: 98 },
  { name: 'Tue', success_rate: 97 },
  { name: 'Wed', success_rate: 99 },
  { name: 'Thu', success_rate: 95 },
  { name: 'Fri', success_rate: 96 },
];

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-8 w-full h-full overflow-y-auto bg-slate-50 min-w-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Operations Command Center</h1>
        <p className="text-slate-500 mt-2 text-sm">Real-time overview of support operations and freight status.</p>
      </div>

      <div className="mb-8">
        <KPICards />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <CriticalTicketsWidget />
        <SlaAtRiskWidget />
        <OnlineAgentsWidget />
        <QueueHealthWidget />
        <FreightAlertsWidget />
        <HighPriorityQueueWidget />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 w-full min-w-0">
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-200 w-full min-w-0 overflow-hidden">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Response Time Trends (hrs)</h2>
          <div className="w-full min-w-0 overflow-x-auto">
            <div className="min-w-[400px] w-full">
              <LineChart 
                data={responseTimeData} 
                xKey="name" 
                series={[{ key: 'response_time', name: 'Avg Response Time' }]} 
                height={300} 
              />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-200 w-full min-w-0 overflow-hidden">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">SLA Performance (%)</h2>
          <div className="w-full min-w-0 overflow-x-auto">
            <div className="min-w-[400px] w-full">
              <BarChart 
                data={slaData} 
                xKey="name" 
                series={[{ key: 'success_rate', name: 'SLA Success Rate' }]} 
                height={300} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
