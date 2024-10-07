import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login', // 사용자 정의 로그인 페이지 설정
    },
    callbacks: {
        // 요청이 인증되었는지 확인하는 콜백함수
        authorized({ auth, request: { nextUrl }}) {
            const isLoggedIn = !!auth?.user; // 사용자가 로그인했는지 여부 확인
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard'); // 현재 페이지가 대시보드인지 확인

            if (isOnDashboard) {
                return isLoggedIn; // 대시보드에는 로그인한 사용자만 접근 가능
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl)); // 로그인한 사용자를 대시보드로 리다이렉트
            }

            return true; // 그 외에는 페이지 접근 허용
        },
    },
    providers: [],
} satisfies NextAuthConfig;