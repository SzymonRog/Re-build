import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['dummyimage.com'], // dodaj hostname, z którego pobierasz obrazki
    },
};

export default nextConfig;
