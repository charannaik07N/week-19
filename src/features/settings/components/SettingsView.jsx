'use client';
import { useState } from 'react';
import Tabs from '@/shared/components/ui/Tabs';
import Button from '@/shared/components/ui/Button';

export function SettingsView() {
  const [activeTab, setActiveTab] = useState('workspace');

  const tabs = [
    { label: 'Workspace', value: 'workspace' },
    { label: 'Profile', value: 'profile' },
    { label: 'Security', value: 'security' },
  ];

  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-6 w-full">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your account settings and preferences.</p>
      </div>

      <div className="hidden md:block">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <div className="mt-4 md:mt-8 flex flex-col gap-8 md:block">
        <div className={activeTab === 'workspace' ? 'block' : 'block md:hidden'}>
          <div className="space-y-4 md:space-y-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Workspace Settings</h2>
            <div className="p-4 md:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Workspace Name</label>
                  <input type="text" defaultValue="My Workspace" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent text-slate-900 dark:text-white min-h-[44px]" />
                </div>
                <div className="min-h-[44px] flex items-center">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={activeTab === 'profile' ? 'block' : 'block md:hidden'}>
          <div className="space-y-4 md:space-y-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Profile Settings</h2>
            <div className="p-4 md:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                  <input type="text" defaultValue="Admin User" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent text-slate-900 dark:text-white min-h-[44px]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                  <input type="email" defaultValue="admin@example.com" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent text-slate-900 dark:text-white min-h-[44px]" />
                </div>
                <div className="min-h-[44px] flex items-center">
                  <Button>Update Profile</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={activeTab === 'security' ? 'block' : 'block md:hidden'}>
          <div className="space-y-4 md:space-y-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Security Settings</h2>
            <div className="p-4 md:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent text-slate-900 dark:text-white min-h-[44px]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-transparent text-slate-900 dark:text-white min-h-[44px]" />
                </div>
                <div className="min-h-[44px] flex items-center">
                  <Button variant="primary">Change Password</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
