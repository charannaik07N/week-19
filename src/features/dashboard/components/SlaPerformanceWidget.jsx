import React from 'react';
import { LineChart } from '@/shared/components/ui/Charts';

export function SlaPerformanceWidget() {
  const data = [
    { name: 'Mon', 'Met': 95, 'Breached': 5 },
    { name: 'Tue', 'Met': 92, 'Breached': 8 },
    { name: 'Wed', 'Met': 88, 'Breached': 12 },
    { name: 'Thu', 'Met': 96, 'Breached': 4 },
    { name: 'Fri', 'Met': 98, 'Breached': 2 },
    { name: 'Sat', 'Met': 99, 'Breached': 1 },
    { name: 'Sun', 'Met': 100, 'Breached': 0 },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">SLA Performance</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">7-day rolling SLA compliance (%)</p>
      </div>
      <div className="flex-1 min-h-[250px]">
        <LineChart 
          data={data} 
          series={[
            { key: 'Met', name: 'SLA Met' },
            { key: 'Breached', name: 'SLA Breached' }
          ]} 
          height={250} 
        />
      </div>
    </div>
  );
}
