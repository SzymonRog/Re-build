import {NextResponse} from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: Request){
    try {
        const body = await request.json()
        const {email,password,remember} = body


        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!user){
            return NextResponse.json(
                {success: false, error:{code: 'INVALID_DATA', message:'Twoje dane logowania są niepoprawne'}},
                { status: 400 }
            )
        }

        const hash = user.password

        const isPasswordValid = await bcrypt.compare(password, hash!)

        if (!isPasswordValid){
            return NextResponse.json(
                { success: false, error: { code: 'INVALID_DATA', message: 'Twoje dane logowania są niepoprawne' } },
                { status: 400 }
            );
        }
        const expiresIn = remember ? '7d' : '1h'
        const token = jwt.sign(
            {userId: user.id, email: user.email, name: user.name},
            process.env.JWT_SECRET!,
            {expiresIn: expiresIn}
        );

        const response = NextResponse.json(
            {success: true,error: null, message:'Zalogowano cie pomyślnie',user: {name:user.name, image:user.image, email:user.email}},
            { status: 200 }
        )

        response.cookies.set({
            name: 'auth_token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge:remember ? 60 *60 *24 * 7 : 60 * 60 ,
        })

        return response


    }catch (e: unknown) {
        console.error(e)
        return NextResponse.json(
            {success: false, error:{code: 'SERVER_ERROR', message:'Serwer napotkał nieoczekiwany problem'} },
            { status: 500 }
        )
    }
}
