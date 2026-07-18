'use client';

import { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { Table } from '@/shared/components/ui/Table';
import Badge from '@/shared/components/ui/Badge';
import Avatar from '@/shared/components/ui/Avatar';
import { MOCK_AGENTS } from '@/shared/constants/mockData';

export function TeamView() {
  const [view, setView] = useState('grid');

  const columns = [
    {
      key: 'name', label: 'Agent Name', sortable: true, render: (val) => (
        <div className="flex items-center gap-3">
          <Avatar name={val} size="sm" />
          <span className="font-medium text-slate-900 dark:text-white">{val}</span>
        </div>
      )
    },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'role', label: 'Role', sortable: true, render: (val) => <span className="capitalize">{val.replace('_', ' ')}</span> },
    {
      key: 'status', label: 'Status', sortable: true, render: (val) => (
        <Badge variant={val === 'online' ? 'success' : val === 'away' ? 'warning' : 'default'}>{val}</Badge>
      )
    },
    { key: 'active_tickets', label: 'Active Tickets', sortable: true },
  ];

  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Team Directory</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your RapidDispatch support and operations agents.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setView('grid')}
            className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md transition-colors ${view === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setView('table')}
            className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md transition-colors ${view === 'table' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_AGENTS.map((agent) => (
            <div key={agent.id} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:border-blue-500 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <Avatar name={agent.name} size="lg" />
                <Badge variant={agent.status === 'online' ? 'success' : agent.status === 'away' ? 'warning' : 'default'}>{agent.status}</Badge>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{agent.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{agent.email}</p>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Department</div>
                  <div className="font-medium text-slate-900 dark:text-white">{agent.department}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Active Tickets</div>
                  <div className="font-medium text-slate-900 dark:text-white">{agent.active_tickets}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="hidden md:block">
            <Table columns={columns} data={MOCK_AGENTS} />
          </div>
          <div className="md:hidden flex flex-col gap-4">
            {MOCK_AGENTS.map((agent) => (
              <div key={agent.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar name={agent.name} size="md" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">{agent.name}</div>
                    <div className="text-sm text-slate-500 capitalize">{agent.role.replace('_', ' ')}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 border-t border-slate-100 dark:border-slate-800 pt-3 text-sm">
                  <div>
                    <span className="block text-slate-500 text-xs mb-1">Presence</span>
                    <Badge variant={agent.status === 'online' ? 'success' : agent.status === 'away' ? 'warning' : 'default'}>{agent.status}</Badge>
                  </div>
                  <div>
                    <span className="block text-slate-500 text-xs mb-1">Ticket</span>
                    <span className="font-medium text-slate-900 dark:text-white">{agent.active_tickets}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 text-xs mb-1">Workload</span>
                    <span className="font-medium text-slate-900 dark:text-white">{agent.active_tickets > 3 ? 'High' : 'Normal'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
