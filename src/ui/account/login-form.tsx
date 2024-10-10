'use client';

import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button } from "../component/button";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/backend/account-actions";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function LoginForm() {
    // 상태 관리 - 이메일과 에러 메시지
    const [email, setEmail] = useState('');
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    const searchParams = useSearchParams();
    const signup = searchParams.get('signup');
    const signupEmail = searchParams.get('email');

    // 회원가입 성공 후 이메일을 폼에 자동으로 설정
    useEffect(() => {
        if (signup === 'success' && signupEmail) setEmail(signupEmail);
    }, [signup, signupEmail]);

    // 공통 입력 스타일
    const inputStyle = "peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500";

    return (
        <form action={dispatch} className="space-y-3">
            <div className="flex-1 px-6 pt-8 pb-4 rounded-lg bg-gray-50">
                {signup === 'success' && <div className="mb-3 text-xl text-center text-blue-600">회원가입 완료 메시지</div>}
                <h1 className="mb-3 text-xl">대시보드를 이용하기 위해 로그인 해 주세요.</h1>
                <div className="w-full">
                    {/* 이메일 입력 필드 */}
                    <div>
                        <label className="block mt-5 mb-3 font-normal text-gray-900 text-sm" htmlFor="email">이메일</label>
                        <div className="relative">
                            <input className={inputStyle} id="email" type="email" name="email" placeholder="Enter your email address" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    {/* 비밀번호 입력 필드 */}
                    <div className="mt-4">
                        <label className="block mt-5 mb-3 font-medium text-gray-900 text-sm" htmlFor="password">암호</label>
                        <div className="relative">
                            <input className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500" id="password" type="password" name="password" placeholder="Enter password" required minLength={6} />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
                {/* 로그인 버튼 */}
                <LoginButton />
                {/* 에러 메시지 표시 */}
                <div className="flex items-end h-8 space-x-1" aria-live="polite" aria-atomic="true">
                    {errorMessage && (
                        <>
                            <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        </>
                    )}
                </div>
            </div>      
        </form>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();
    return <Button className="w-full mt-4" aria-disabled={pending}>로그인
    <ArrowRightIcon className="w-5 h-5 ml-auto text-gray-50" /></Button>
}