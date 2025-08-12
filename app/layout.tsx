import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { Inter } from 'next/font/google'
import AuthProviderClient from "@/components/auth/AuthProviderClient";
import {cookies} from "next/headers";
import jwt from "jsonwebtoken";


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

    let user = null;

    if (tokenCookie) {
        try {
            user = jwt.verify(tokenCookie.value, process.env.JWT_SECRET!);
            // user będzie obiektem z payload tokena, np { userId, email, name, iat, exp }
        } catch (error) {
            // Token jest niepoprawny lub wygasł
            user = null;
        }
    }

    if (tokenCookie) {
        try {
            user = jwt.verify(tokenCookie.value, process.env.JWT_SECRET!);
            // user będzie obiektem z payload tokena, np { userId, email, name, iat, exp }
        } catch (error) {
            // Token jest niepoprawny lub wygasł
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
