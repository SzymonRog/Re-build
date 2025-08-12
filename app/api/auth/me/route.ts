import jwt from "jsonwebtoken";
import getAuthToken from "@/lib/getAuthToken";
import { NextResponse } from "next/server";

export async function GET(request: Request){
    const cookie = await getAuthToken();
    const token = cookie?.value
    if(!token){
        return NextResponse.json({ success: false, error: "Brak tokenu" }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)
        return NextResponse.json({ success: true, user: decoded })
    }catch {
        return NextResponse.json({ success: false, error: "Token nie jest poprawny" }, { status: 401})
    }
}