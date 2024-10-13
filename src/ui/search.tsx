'use client';

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string}) {
    // 현재 검색 파라미터와 경로명을 가져옵니다.
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    // 검색어 입력 시 지연된 검색을 수행하는 함수
    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    // 검색 입력 필드와 아이콘을 포함한 UI 구성
    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">Search</label>
            <input className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500" placeholder={placeholder} onChange={(e) => handleSearch(e.target.value)} defaultValue={searchParams.get('query')?.toString()} />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
    )
}