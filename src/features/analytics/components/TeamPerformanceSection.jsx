'use client';

import React from 'react';
import { BarChart, LineChart } from '@/shared/components/ui/Charts';

const responseTimeData = [
  { name: 'Alex M.', time: 12 },
  { name: 'Sarah J.', time: 8 },
  { name: 'Emma W.', time: 15 },
  { name: 'Michael C.', time: 5 },
  { name: 'John D.', time: 20 },
];

const ticketsPerAgentData = [
  { name: 'Alex M.', tickets: 45 },
  { name: 'Sarah J.', tickets: 62 },
  { name: 'Emma W.', tickets: 38 },
  { name: 'Michael C.', tickets: 55 },
  { name: 'John D.', tickets: 28 },
];

export function TeamPerformanceSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8 w-full min-w-0">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700 w-full min-w-0 overflow-hidden">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Avg Response Time (Mins)</h3>
        <div className="w-full min-w-0 overflow-x-auto">
          <div className="min-w-[400px] w-full">
            <BarChart 
              data={responseTimeData} 
              series={[{ key: 'time', name: 'Avg Response Time' }]} 
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700 w-full min-w-0 overflow-hidden">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Tickets Handled This Week</h3>
        <div className="w-full min-w-0 overflow-x-auto">
          <div className="min-w-[400px] w-full">
            <BarChart 
              data={ticketsPerAgentData} 
              series={[{ key: 'tickets', name: 'Tickets Handled' }]} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
