import { ChartBarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function LevelupLogo() {
  return (
    <Link href="/">
      <div className="flex flex-row items-center text-white">
        <ChartBarIcon className="w-4 h-4 mr-1 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14" />
        <p className="block text-xl sm:hidden hover:underline whitespace-nowrap">레벨업 Dashboard</p>
      </div>
    </Link>
  );
}