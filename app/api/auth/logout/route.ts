import {NextResponse} from "next/server";

export async function POST(){
    const response = NextResponse.json({success: true})

    response.cookies.set({
        name: 'auth_token',        // nazwa ciasteczka, którą używasz
        value: '',
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0,            // natychmiastowe wygaszenie
        sameSite: 'lax',
    })

    return response
}