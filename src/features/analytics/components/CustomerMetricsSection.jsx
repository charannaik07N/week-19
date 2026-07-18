'use client';

import React from 'react';
import { LineChart, PieChart } from '@/shared/components/ui/Charts';

const csatTrendData = [
  { name: 'Week 1', score: 92 },
  { name: 'Week 2', score: 94 },
  { name: 'Week 3', score: 91 },
  { name: 'Week 4', score: 95 },
  { name: 'Week 5', score: 96 },
];

const escalationsData = [
  { name: 'Delay', value: 35 },
  { name: 'Damage', value: 20 },
  { name: 'Lost Cargo', value: 10 },
  { name: 'Billing', value: 15 },
  { name: 'Other', value: 20 },
];

export function CustomerMetricsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8 w-full min-w-0">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700 w-full min-w-0 overflow-hidden">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">CSAT Trend (%)</h3>
        <div className="w-full min-w-0 overflow-x-auto">
          <div className="min-w-[400px] w-full">
            <LineChart 
              data={csatTrendData} 
              series={[{ key: 'score', name: 'CSAT Score' }]} 
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700 w-full min-w-0 overflow-hidden">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Escalations by Reason</h3>
        <div className="w-full min-w-0 overflow-x-auto">
          <div className="min-w-[300px] w-full h-[300px]">
            <PieChart data={escalationsData} innerRadius={50} />
          </div>
        </div>
      </div>
    </div>
  );
}
