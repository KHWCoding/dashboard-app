import Form from "@/ui/projects/create-form";
import Breadcrumbs from "@/ui/projects/breadcurmbs";

export default async function Page() {
    return (
        <main>
            {/* 브레드크럼bs 구성 */}
            <Breadcrumbs breadcrumbs={[
                { label: '프로젝트', href: '/dashboard/projects' },
                { label: '프로젝트 생성', href: '/dashboard/projects/create', active: true},
            ]} />
            <Form />
        </main>
    );
}