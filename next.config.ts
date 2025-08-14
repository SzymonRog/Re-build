import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['dummyimage.com'], // dodaj hostname, z którego pobierasz obrazki
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
