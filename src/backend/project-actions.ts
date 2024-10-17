'use server';

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "../../auth";

// 프로젝트를 생성하는 스키마 정의
const CreateProjectSchema = z.object({
    name: z.string().nonempty({ message: 'Please enter a project name.' }),
    website_url: z.string().optional(),
});

export type ProjectState = {
    errors?: { name?: string[]; website_url?: string[]; };
    message?: string | undefined;
};

export async function createProject(prevState: ProjectState, formData: FormData) {
    // 폼 데이터 유효성 검사
    const validateFields = CreateProjectSchema.safeParse({
        name: formData.get('name'),
        website_url: formData.get('website_url'),
    });

    // 유효성 검사 실패 시 에러 반환
    if (!validateFields.success) {
        return { errors: validateFields.error.flatten().fieldErrors, message: 'Missing or Invalid fields.' };
    }

    // 사용자 인증 확인
    const {name, website_url} = validateFields.data;
    const session = await auth();
    const userEmail = session?.user?.email;
    if (userEmail === '') {
        return { message: 'Authentication failed.' };
    }

    // 중복 프로젝트 확인
    try {
        const existingProject = await sql`SELECT * FROM projects WHERE name = ${    name}`;
        if (existingProject.rowCount ?? 0 > 0) {
            return { message: 'Project already exists.' };
        }
    } catch (error) {
        return { message: 'Database error during project validation.' };
    }

    // 새 프로젝트 데이터베이스에 삽입
    try {
        await sql`INSERT INTO projects (user_email, name, wesite_url) VALUSE (${userEmail}, ${name}, ${website_url})`;
    } catch (error) {
        return { message: 'Failed to create project.' };
    }

    revalidatePath('/dashboard/projects');
    redirect('/dashboard/projects');
}

export async function deleteProject(id: string) {
    try {
        await sql`DELETE FROM projects WHERE id = ${id}`;
        revalidatePath('/dashboard/projects');
        return { message: 'Deleted Project.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Project.' };
    }
}

const UpdateProjectSchema = z.object({
    name: z.string().nonempty({ message: 'Please enter a project name.' }),
    website_url: z.string().optional(),
  });

export async function updateProject(id: string, prevState: ProjectState, formData: FormData) {
    // 폼 데이터 유효성 검사
    const validatedFields = UpdateProjectSchema.safeParse({
        name: formData.get('name'),
        website_url: formData.get('website_url'),
    });

    // 유효성 검사 실패 시 에러 반환
    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors, message: 'Missing Fields. Failed to Invalid fields.' };
    }

    const { name, website_url } = validatedFields.data;
    // 데이터베이스 업데이트 시도
    try {
        await sql`UPDATE projects SET name = ${name}, website_url = ${website_url} WHERE id = ${id}`;
    } catch (error) {
        return { message: 'Failed to update project.' };
    }

    // 캐시 무효화 및 리디렉션
    revalidatePath('/dashboard/projects');
    redirect('/dashboard/projects');
}