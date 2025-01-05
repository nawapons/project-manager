/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "zvomobixtewrgsmyijry.supabase.co",
            }
        ]
    }
};

export default nextConfig;
