import React from 'react';
import { BarChart } from '@/shared/components/ui/Charts';

export function ResponseTimeWidget() {
  const data = [
    { name: '8am', 'Avg Response': 15, 'Target': 20 },
    { name: '9am', 'Avg Response': 18, 'Target': 20 },
    { name: '10am', 'Avg Response': 25, 'Target': 20 },
    { name: '11am', 'Avg Response': 22, 'Target': 20 },
    { name: '12pm', 'Avg Response': 14, 'Target': 20 },
    { name: '1pm', 'Avg Response': 12, 'Target': 20 },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Response Time Trend</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Average first response time (minutes)</p>
      </div>
      <div className="flex-1 min-h-[250px]">
        <BarChart 
          data={data} 
          series={[
            { key: 'Avg Response', name: 'Avg Response' }
          ]} 
          height={250} 
        />
      </div>
    </div>
  );
}
