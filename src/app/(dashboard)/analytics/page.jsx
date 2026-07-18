'use client';

import React, { useState } from 'react';
import Tabs from '@/shared/components/ui/Tabs';
import { OperationsSection } from '@/features/analytics/components/OperationsSection';
import { TeamPerformanceSection } from '@/features/analytics/components/TeamPerformanceSection';
import { CustomerMetricsSection } from '@/features/analytics/components/CustomerMetricsSection';
import { LogisticsMetricsSection } from '@/features/analytics/components/LogisticsMetricsSection';

const TABS = [
  { value: 'operations', label: 'Operations' },
  { value: 'team', label: 'Team Performance' },
  { value: 'customer', label: 'Customer Metrics' },
  { value: 'logistics', label: 'Logistics Metrics' },
];

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('operations');

  return (
    <div className="p-4 md:p-8 w-full h-full overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track performance, monitor operations, and analyze logistics metrics.
          </p>
        </div>
      </div>

      <div className="mb-6">
        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <div className="mt-6">
        {activeTab === 'operations' && <OperationsSection />}
        {activeTab === 'team' && <TeamPerformanceSection />}
        {activeTab === 'customer' && <CustomerMetricsSection />}
        {activeTab === 'logistics' && <LogisticsMetricsSection />}
      </div>
    </div>
  );
}
