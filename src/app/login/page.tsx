import LevelupLogo from "@/ui/logo";
import LoginForm from "@/ui/account/login-form";

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex items-end w-full h-20 p-3 bg-blue-500 rounded-lg md:h-36">
                    <LevelupLogo />
                </div>
                <LoginForm />
            </div>
        </main>
    )
}

/*import { auth } from "../../../auth";
import LogoutForm from "@/ui/account/logout-form";

export default async function Page() {
    const session = await auth();

    // 세션 정보가 없으면 로그인 페이지로 리다이렉트 등의 처리를 할 수 있습니다.
    if (!session) {
        // 예: 리다이렉트 로직 return <Redirect to="/login" />;
        return null;
    }

    return (
        <main className="p-0">
            <h2 className="mb-4 text-xl md:text-2xl">대시보드</h2>
            <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 md:text-base">이름: { session?.user?.name}</p>
            </div>
            <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 md:text-base">이름: { session?.user?.email}</p>
            </div>
            <LogoutForm />
        </main>
    )
}*/