import { NextResponse } from 'next/server';
import {hashPassword} from "@/lib/auth";
import prisma from "@/prisma/client";


export async function POST(request: Request) {
    try {
        const body = await request.json()
        const {name,email,password} = body

        if(!isEmailValid(email)){
            return NextResponse.json(
                {success: false, error:{code: 'EMAIL_INVALID', message:'Niepoprawny format email'}},
                { status: 400 }
            )
        }

        if(!isPasswordValid(password)){
            return NextResponse.json(
                {success: false, error:{code: 'PASSWORD_INVALID', message:'Niepoprawny format hasła'}},
                { status: 400 }
            )
        }

        const isEmailTaken = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(isEmailTaken){
            return NextResponse.json(
                {success: false, error:{code: 'EMAIL_TAKEN', message:'Ten email jest już zajęty'}},
                { status: 400 }
            )
        }
        const hashedPassword = await hashPassword(password)
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        })

        return NextResponse.json(
            {success: true,error: null, message:'Nowe konto zostało utworzone', data: {name, email}},
            { status: 201 }
        )

    }catch (e: any) {
        if (e.code === 'P2002') {
            return NextResponse.json(
                { success: false, error: { code: 'EMAIL_TAKEN', message: 'Ten email jest już zajęty' } },
                { status: 400 }
            );
        }

        console.error(e)
        return NextResponse.json(
            {success: false, error:{code: 'SERVER_ERROR', message:'Serwer napotkał nieoczekiwany problem'} },
            { status: 500 }
        )
    }
}

function isPasswordValid(password: string) {
    return password.length >= 6
}
function isEmailValid(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}