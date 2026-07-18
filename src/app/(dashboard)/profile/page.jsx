import { ProfileView } from '@/features/profile/components/ProfileView';

export const metadata = {
  title: 'Profile | RapidDispatch',
  description: 'View your profile',
};

export default function ProfilePage() {
  return (
    <div className="p-6">
      <ProfileView />
    </div>
  );
}
