import { SearchView } from '@/features/search/components/SearchView';

export const metadata = {
  title: 'Search | RapidDispatch',
  description: 'Global search',
};

export default function SearchPage() {
  return (
    <div className="p-6">
      <SearchView />
    </div>
  );
}
