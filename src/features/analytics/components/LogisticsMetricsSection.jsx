'use client';

import React from 'react';
import { LineChart, BarChart } from '@/shared/components/ui/Charts';

const delayTrendData = [
  { name: 'Jan', delays: 120 },
  { name: 'Feb', delays: 95 },
  { name: 'Mar', delays: 110 },
  { name: 'Apr', delays: 85 },
  { name: 'May', delays: 70 },
  { name: 'Jun', delays: 65 },
];

const failuresData = [
  { name: 'Engine', count: 45 },
  { name: 'Tires', count: 82 },
  { name: 'Reefer', count: 24 },
  { name: 'Brakes', count: 35 },
  { name: 'Electrical', count: 50 },
];

export function LogisticsMetricsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8 w-full min-w-0">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700 w-full min-w-0 overflow-hidden">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Delayed Shipments Trend</h3>
        <div className="w-full min-w-0 overflow-x-auto">
          <div className="min-w-[400px] w-full">
            <LineChart 
              data={delayTrendData} 
              series={[{ key: 'delays', name: 'Delayed Shipments' }]} 
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700 w-full min-w-0 overflow-hidden">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Truck Failures by Type</h3>
        <div className="w-full min-w-0 overflow-x-auto">
          <div className="min-w-[400px] w-full">
            <BarChart 
              data={failuresData} 
              series={[{ key: 'count', name: 'Failure Count' }]} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
