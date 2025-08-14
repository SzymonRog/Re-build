import prisma from "@/prisma/client";
import {NextResponse} from "next/server";


export async function GET(req: Request, context: any){
    try {
        const type = context.params.type;

        const components = await prisma.component.findMany({
            where: {
                type
            }});
        if(components.length === 0){
            return NextResponse.json({success: false,error:null, message:'Brak komponentów o podanym typie' },{status:404})
        }
        return NextResponse.json({success: true,error:null ,components:components},{status:200})
    }catch (e) {
        console.error(e)
        return NextResponse.json({success: false,error:{e}, message:'Błąd serwera' }, {status:500})
    }

}