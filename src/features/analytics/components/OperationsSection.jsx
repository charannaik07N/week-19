'use client';

import React from 'react';
import { LineChart, BarChart, PieChart } from '@/shared/components/ui/Charts';

const resolutionTrendData = [
  { name: 'Mon', resolved: 45, created: 52 },
  { name: 'Tue', resolved: 52, created: 48 },
  { name: 'Wed', resolved: 38, created: 40 },
  { name: 'Thu', resolved: 65, created: 60 },
  { name: 'Fri', resolved: 48, created: 45 },
  { name: 'Sat', resolved: 25, created: 20 },
  { name: 'Sun', resolved: 20, created: 15 },
];

const slaComplianceData = [
  { name: 'Critical', compliant: 92, violated: 8 },
  { name: 'High', compliant: 95, violated: 5 },
  { name: 'Medium', compliant: 98, violated: 2 },
  { name: 'Low', compliant: 99, violated: 1 },
];

const activeTicketsPriorityData = [
  { name: 'Critical', value: 12 },
  { name: 'High', value: 24 },
  { name: 'Medium', value: 45 },
  { name: 'Low', value: 19 },
];

export function OperationsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8 w-full min-w-0">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700 w-full min-w-0 overflow-hidden">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Resolution Trend</h3>
        <div className="w-full min-w-0 overflow-x-auto">
          <div className="min-w-[400px] w-full">
            <LineChart 
              data={resolutionTrendData} 
              series={[
                { key: 'resolved', name: 'Resolved Tickets' },
                { key: 'created', name: 'Created Tickets' }
              ]} 
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700 w-full min-w-0 overflow-hidden">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">SLA Compliance by Priority (%)</h3>
        <div className="w-full min-w-0 overflow-x-auto">
          <div className="min-w-[400px] w-full">
            <BarChart 
              data={slaComplianceData} 
              series={[
                { key: 'compliant', name: 'Compliant' },
                { key: 'violated', name: 'Violated' }
              ]} 
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700 lg:col-span-2 w-full min-w-0 overflow-hidden">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Active Tickets by Priority</h3>
        <div className="w-full min-w-0 overflow-x-auto">
          <div className="min-w-[300px] w-full h-[300px]">
            <PieChart data={activeTicketsPriorityData} innerRadius={60} />
          </div>
        </div>
      </div>
    </div>
  );
}
