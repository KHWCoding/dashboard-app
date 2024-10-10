import { HomeIcon, UserCircleIcon, DocumentChartBarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
    { name: '홈', href: '/dashboard', icon: HomeIcon },
    { name: '프로젝트', href: '/dashboard/projects', icon: DocumentChartBarIcon },
    { name: '사용자 계정', href: '/dashboard/account', icon: UserCircleIcon }
];

export default function NavLinks() {
    // 현재 경로를 가져와서 해당 링크에 스타일을 적용
    const pathname = usePathname();
    return (
        <>
            {links.map(({ name, href, icon: LinkIcon }) => (
                <Link key={name} href={href} className={clsx('flex h-[48px] items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:justify-start md:p-2 md:px-3', { 'bg-sky-100 text-blue-600': pathname === href })}>
                    <LinkIcon className="w-6" />
                    <span className="hidden md:block">{name}</span>
                </Link>
            ))}
        </>
    )
}