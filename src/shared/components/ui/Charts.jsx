'use client';
import React from 'react';
import {
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
  Bar,
  Line,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

const colors = [
  '#3b82f6', // blue-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#ef4444', // red-500
  '#8b5cf6', // violet-500
  '#06b6d4', // cyan-500
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg rounded-lg p-3 text-sm">
        {label && <p className="font-medium text-gray-900 dark:text-gray-100 mb-2">{label}</p>}
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: entry.color }} />
              <span className="text-gray-600 dark:text-gray-400 capitalize">{entry.name}:</span>
            </div>
            <span className="font-semibold text-gray-900 dark:text-gray-100">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function BarChart({ data, xKey = 'name', series = [{ key: 'value', name: 'Value' }], height = 300 }) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-gray-200 dark:text-gray-800 opacity-50" />
          <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor' }} className="text-gray-500" dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor' }} className="text-gray-500" dx={-10} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', opacity: 0.05 }} className="text-gray-900 dark:text-gray-100" />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} iconType="circle" />
          {series.map((s, idx) => (
            <Bar 
              key={s.key} 
              dataKey={s.key} 
              name={s.name || s.key} 
              fill={colors[idx % colors.length]} 
              radius={[4, 4, 0, 0]} 
              maxBarSize={40}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LineChart({ data, xKey = 'name', series = [{ key: 'value', name: 'Value' }], height = 300 }) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-gray-200 dark:text-gray-800 opacity-50" />
          <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor' }} className="text-gray-500" dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor' }} className="text-gray-500" dx={-10} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'currentColor', opacity: 0.2 }} />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} iconType="circle" />
          {series.map((s, idx) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.name || s.key}
              stroke={colors[idx % colors.length]}
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: 'var(--background, #fff)' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PieChart({ data, nameKey = 'name', dataKey = 'value', height = 300, innerRadius = 0 }) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <RechartsPieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} iconType="circle" />
          <Pie
            data={data}
            nameKey={nameKey}
            dataKey={dataKey}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={Math.min(height / 2 - 40, 120)}
            stroke="none"
            paddingAngle={innerRadius > 0 ? 2 : 0}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
