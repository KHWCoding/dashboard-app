import SideNav from "@/ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
    // 전체 페이지 레이아웃 구성
    return (
        <div className="flex flex-col h-screen md:flex-row md:overflow-hidden">
            {/* 사이드 메누 섹션 */}
            <div className="flex-none w-full md:w-64">
                <SideNav />
            </div>
            {/* 메인 콘텐츠 작성 */}
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                {children} {/* 자식 컴포넌트가 렌더링되는 부분 */}
            </div>
        </div>
    )
}