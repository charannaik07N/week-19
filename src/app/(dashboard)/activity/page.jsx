import ActivityCenterView from '@/features/activity/components/ActivityCenterView';

export const metadata = {
  title: 'Activity Center | RapidDispatch',
};

export default function ActivityPage() {
  return (
    <div className="w-full h-full p-8 overflow-y-auto">
      <ActivityCenterView />
    </div>
  );
}
