'use client';

import React, { useState, useEffect } from "react";
import { UserPlusIcon, AtSymbolIcon, KeyIcon, ExclamationCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import { Button } from "../component/button";
import { useFormState, useFormStatus } from "react-dom";
import { signUp } from "@/backend/account-action";

export default function SignUpForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [errorMessage, dispatch] = useFormState(signUp, undefined);

    useEffect(() => {
        if (password !== confirmPassword && confirmPassword !== '') {
            setPasswordError('Passwords do not match.');
        } else {
            setPasswordError('');
        }
    }, [password, confirmPassword]);

    return (
        <form action={dispatch} className="space-y-3">
            <div className="flex-1 px-6 pt-8 pb-4 rounded-lg bg-gray-50">
                <h1 className="mb-3 text-2xl">회원가입</h1>
                <div className="w-full">
                    {passwordError && <div className="mt-2 text-sm text-red-500">{passwordError}</div>}
                </div>
                <SignUpButton />
                {errorMessage && (
                    <>
                        <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
                        <p className="text-sm text-red-500">{errorMessage}</p>
                    </>
                )}
            </div>          
        </form>
    );
}

function SignUpButton() {
    const { pending } = useFormStatus();
    return (
        <Button className="w-full mt-4" aria-disabled={pending}>
            회원가입 <UserPlusIcon className="w-5 h-5 ml-auto text-gray-50" />
        </Button>
    );
}