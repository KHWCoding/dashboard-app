'use client';

import { useEffect } from "react";

export default function Error({ error, reset, }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // 오류 로깅 (옵션)
        console.error(error);
    }, [error]);

    return (
        <main className="flex flex-col items-center justify-center h-full">
            <h2 className="text-center">Something went wrong!</h2>
            <button onClick={() => reset()} className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-400">재시도하기</button>
        </main>
    );
}