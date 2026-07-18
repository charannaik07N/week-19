import React from 'react';
import { LineChart, BarChart, PieChart } from '@/shared/components/ui/Charts';

const operationsData = [
  { name: '08:00', volume: 120 },
  { name: '10:00', volume: 200 },
  { name: '12:00', volume: 150 },
  { name: '14:00', volume: 300 },
  { name: '16:00', volume: 250 },
  { name: '18:00', volume: 180 },
];

const teamPerformanceData = [
  { name: 'John D.', score: 95 },
  { name: 'Sarah M.', score: 98 },
  { name: 'Mike R.', score: 85 },
  { name: 'Emily W.', score: 92 },
  { name: 'Alex T.', score: 88 },
];

const customerSatisfactionData = [
  { name: '5 Stars', value: 450 },
  { name: '4 Stars', value: 300 },
  { name: '3 Stars', value: 150 },
  { name: '2 Stars', value: 50 },
  { name: '1 Star', value: 20 },
];

const logisticsData = [
  { name: 'On Time', value: 85 },
  { name: 'Delayed', value: 10 },
  { name: 'In Transit', value: 5 },
];

export default function AnalyticsView() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-screen bg-slate-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Executive Dashboard</h1>
        <p className="text-slate-500 mt-2 text-sm">Comprehensive view of business operations and performance metrics.</p>
      </div>

      <div className="space-y-8">
        {/* Operations Section */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">Operations</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-sm font-medium text-slate-500 mb-6">Ticket Volume Trend</h3>
              <LineChart 
                data={operationsData} 
                xKey="name" 
                series={[{ key: 'volume', name: 'Tickets' }]} 
                height={300} 
              />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-sm font-medium text-slate-500 mb-6">Resolution Rate</h3>
              <BarChart 
                data={operationsData} 
                xKey="name" 
                series={[{ key: 'volume', name: 'Resolved' }]} 
                height={300} 
              />
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">Team</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-sm font-medium text-slate-500 mb-6">Agent Performance Scores</h3>
              <BarChart 
                data={teamPerformanceData} 
                xKey="name" 
                series={[{ key: 'score', name: 'Score' }]} 
                height={300} 
              />
            </div>
          </div>
        </section>

        {/* Customer Section */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">Customer</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-sm font-medium text-slate-500 mb-6">Satisfaction Distribution</h3>
              <PieChart 
                data={customerSatisfactionData} 
                nameKey="name" 
                dataKey="value" 
                height={300}
                innerRadius={60}
              />
            </div>
          </div>
        </section>

        {/* Logistics Section */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">Logistics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-sm font-medium text-slate-500 mb-6">Delivery Status</h3>
              <PieChart 
                data={logisticsData} 
                nameKey="name" 
                dataKey="value" 
                height={300}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
