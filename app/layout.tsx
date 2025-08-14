import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { Inter } from 'next/font/google'
import AuthProviderClient from "@/components/auth/AuthProviderClient";
import {cookies} from "next/headers";
import jwt, {JwtPayload} from "jsonwebtoken";
import {User} from "@/store/user";


const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
});


export const metadata: Metadata = {
  title: "Re-build",
  description: "Platform where you can build your dream pc",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const cookieStore = await cookies()
    const tokenCookie = cookieStore.get('auth_token')

    let user: User | null  = null;


    if (tokenCookie) {
        try {
            const payload = jwt.verify(tokenCookie.value, process.env.JWT_SECRET!) as JwtPayload;

            user = {
                id: payload.userId as string,
                email: payload.email as string,
                name: payload.name as string,
            }
        } catch (error) {
            user = null;
        }
    }


  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >

      <main>
          <AuthProviderClient user={user}/>
              {children}
      </main>
      <Toaster />
      </body>
    </html>
  );
}
