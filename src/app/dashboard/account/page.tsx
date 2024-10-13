import { fetchLoggedInUser } from "@/backend/account-actions";
import { Metadata } from "next";
import { auth } from "../../../../auth";
import DeleteAccount from "@/ui/account/delete-account";

export const metadata: Metadata = { title: 'Account', };

export default async function Page() {
    const session = await auth();
    const email = session?.user?.email || '';
    const user = await fetchLoggedInUser(email);

    return (
        <main>
            <div className="p-4 rounded-md shadow bg-gray-50 md:p-6">
                <h1 className="mb-6 text-xl font-semibold">Your Account</h1>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div className="space-y-1"> {/* 사용자 이름 */}
                        <h2 className="text-sm font-medium text-gray-700">Name</h2>
                        <input className="w-full rounded-md border-gray-300 px-3 py-2 text-lg font-semibold" type="text" value={user.name} readOnly />
                    </div>
                    <div className="space-y-1"> {/* 사용자 이메일 */}
                        <h2 className="text-sm font-medium text-gray-700">Email</h2>
                        <input className="w-full rounded-md border-gray-300 px-3 py-2 text-lg font-semibold" type="email" value={user.email} readOnly />
                    </div>
                    <div className="space-y-1"> {/* UUID 표시 */}
                        <h2 className="text-sm font-medium text-gray-700">UUID</h2>
                        <p className="text-lg font-semibold">{user.id}</p>
                    </div>
                    <div className="space-y-1"> {/* 인증 키 표시 */}
                        <h2 className="text-sm font-medium text-gray-700">Auth Key</h2>
                        <p className="text-lg font-semibold">{user.auth_key}</p>
                    </div>
                </div>
            </div>
            <DeleteAccount deleteEmail={user.email} /> {/* 계정 삭제 기능 */}
        </main>
    );
}