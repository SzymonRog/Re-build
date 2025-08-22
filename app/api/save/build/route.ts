import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import prisma from "@/prisma/client";

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("auth_token")?.value

        if (!token) {
            return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
        const userId = decoded.userId

        if(!userId){
            return new Response(JSON.stringify({ success: false, error: "Brak tokenu" }), { status: 401, headers: { "Content-Type": "application/json" } })
        }

        const { name, componentsIds, totalPrice } = await req.json()

        if (!componentsIds || componentsIds.length === 0) {
            return new Response(JSON.stringify({ success: false, error: "Brak komponentów" }), { status: 400, headers: { "Content-Type": "application/json" } })
        }

        const build = await prisma.build.create({
            data: {
                name,
                totalPrice,
                userId: userId ?? null,
                components: {
                    create: componentsIds.map((componentId: string) => ({
                        component: { connect: { id: componentId } }
                    }))
                }
            }
        })

        return new Response(JSON.stringify({ success: true, data: { id: build.id } }), { status: 200, headers: { "Content-Type": "application/json" } })
    } catch (e) {
        console.error(e)
        return new Response(JSON.stringify({ success: false, error: "Nie udało się zapisać konfiguracji" }), { status: 500, headers: { "Content-Type": "application/json" } })
    }
}


export async function PUT(req: Request) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("auth_token")?.value

        if (!token) {
            return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
        const userId = decoded.userId

        if(!userId){
            return new Response(JSON.stringify({ success: false, error: "Brak tokenu" }), { status: 401, headers: { "Content-Type": "application/json" } })
        }

        const { id, componentsIds} = await req.json()
        if(!id){
            return new Response(JSON.stringify({ success: false, error: "Brak id" }), { status: 400, headers: { "Content-Type": "application/json" } })
        }
        if (!componentsIds || componentsIds.length === 0) {
            return new Response(JSON.stringify({ success: false, error: "Brak komponentów" }), { status: 400, headers: { "Content-Type": "application/json" } })
        }
        const user = await prisma.build.findUnique({
            where: {
                id
            }
        })

        if(!user){
            return new Response(JSON.stringify({ success: false, error: "Nie znaleziono konfiguracji" }), { status: 404, headers: { "Content-Type": "application/json" } })
        }
        if(user.userId !== userId){
            return new Response(JSON.stringify({ success: false, error: "Konfiguracja nie należy do urzytkownika" }), { status: 401, headers: { "Content-Type": "application/json" } })
        }
        await prisma.buildComponent.deleteMany({ where: { buildId: id } });
        await prisma.build.update({
            where: {
                id
            },
            data: {
                userId: userId ?? null,
                components: {
                    create: componentsIds.map((componentId: string) => ({
                        component: { connect: { id: componentId } }
                    }))
                }
            }
        })

        return new Response(JSON.stringify({ success: true}), { status: 200, headers: { "Content-Type": "application/json" } })
    }catch (e) {
        console.error(e)
        return new Response(JSON.stringify({ success: false, error: "Nie udało się zapisać konfiguracji" }), { status: 500, headers: { "Content-Type": "application/json" } })
    }
}