import { sql } from "@vercel/postgres";
import type { User } from "@/types/definitions";

export async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0];
    } catch (error) {
        console.log('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}