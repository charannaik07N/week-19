import { SettingsView } from '@/features/settings/components/SettingsView';

export const metadata = {
  title: 'Settings | RapidDispatch',
  description: 'Manage your settings',
};

export default function SettingsPage() {
  return (
    <div className="p-6">
      <SettingsView />
    </div>
  );
}
