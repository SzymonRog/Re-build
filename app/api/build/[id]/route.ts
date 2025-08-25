import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/client";
import {NextRequest} from "next/server";

export async function GET(req: NextRequest){
    try {
        const { searchParams, pathname } = new URL(req.url);
        const segments = pathname.split("/"); // np. ['', 'api', 'build', '123']
        const id = segments[segments.length - 1];

        let userId: string | null = null;

        // token jest opcjonalny
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
                userId = decoded.userId ?? null;
            } catch (err) {
                console.warn("Invalid token", err);
            }
        }

        // Await params before accessing its properties

        const build = await prisma.build.findUnique({
            where: {id},
            include:{
                components: {
                    include:{
                        component: true
                    }
                },
            }
        })
        if(!build){
            return new Response(
                JSON.stringify({ success: false, error: "Build not found" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        const filteredBuild = {
            ...build,
            components: build.components.filter(bc => bc.component !== null)
        };

        console.log(userId, build.userId , userId === build.userId)
        return new Response(
            JSON.stringify({
                success: true,
                data: filteredBuild,
                isOwner: userId === build.userId,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    }catch (e) {
        console.error(e)
        return new Response(JSON.stringify({ success: false, error: "Nie udało się zapisać konfiguracji" }), { status: 500, headers: { "Content-Type": "application/json" } })
    }
}