import { TeamView } from '@/features/team/components/TeamView';

export const metadata = {
  title: 'Team | RapidDispatch',
  description: 'Manage your AI agents team',
};

export default function TeamPage() {
  return (
    <div className="p-6">
      <TeamView />
    </div>
  );
}
