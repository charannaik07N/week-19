'use client';
import Avatar from '@/shared/components/ui/Avatar';
import Button from '@/shared/components/ui/Button';

export function ProfileView() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="relative">
        {/* Cover Photo */}
        <div className="h-48 w-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl"></div>
        
        {/* Profile Info */}
        <div className="px-6 relative -mt-16 sm:flex sm:items-end sm:space-x-5 pb-6">
          <div className="relative inline-block rounded-full ring-4 ring-white dark:ring-slate-900 bg-white dark:bg-slate-900">
            <Avatar name="Admin User" size="lg" className="h-24 w-24 sm:h-32 sm:w-32 text-2xl" />
          </div>
          <div className="mt-6 sm:mt-0 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white truncate">Admin User</h1>
              <p className="text-slate-500 dark:text-slate-400">admin@example.com</p>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Button variant="outline">Edit Profile</Button>
              <Button>Share</Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bio / Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">About</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              System administrator managing RapidDispatch workspace. Overseeing AI agents and workflow automation.
            </p>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center text-slate-500 dark:text-slate-400">
                <span className="font-medium mr-2 text-slate-700 dark:text-slate-300">Location:</span> San Francisco, CA
              </div>
              <div className="flex items-center text-slate-500 dark:text-slate-400">
                <span className="font-medium mr-2 text-slate-700 dark:text-slate-300">Joined:</span> January 2024
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Updated workspace settings</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{i} day{i !== 1 && 's'} ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
