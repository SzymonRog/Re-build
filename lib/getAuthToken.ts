import { cookies } from 'next/headers'

export default async function getAuthToken() {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')
    return token
}